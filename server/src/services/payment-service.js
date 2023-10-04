const {PaymentRepository} = require('../repositories');
const { message, error } = require('../utils/common/error-response');
const AppError= require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');
const paymentRepository = new PaymentRepository();


async function makePayment(data){
    try{
        const payment = await paymentRepository.create(data);
        if(payment){
            console.log(payment.dataValues)
            sendNotification(payment.dataValues)
        }
        return payment;
    }catch(error){
        console.log("Got error",error.name);
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation=[];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            console.log("explantion=",explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new payment Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function sendNotification(data){

    const accountSid = 'AC843be320f9a1c6ecde0e97ca35f3821f';
    const authToken = 'c75cb7c8c142370e0c879270f589b844';
    const client = require('twilio')(accountSid, authToken);
    const { id, name, slot, duration, amount, locationName } = data;
    const content = `ID: ${id}\nName: ${name}\nSlot: ${slot}\nDuration: ${duration}\nAmount: ${amount}\nLocation: ${locationName}`;

    client.messages
        .create({
                from: '+15074739185',
                to: '+917013206067',
                body: content
    })
    .then(message => console.log(message.sid))
    .catch(error=>console.error(error));
}

module.exports={
    makePayment
}