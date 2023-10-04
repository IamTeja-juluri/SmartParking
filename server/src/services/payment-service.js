const {PaymentRepository} = require('../repositories');
const AppError= require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');
const paymentRepository = new PaymentRepository();


async function makePayment(data){
    try{
        const payment = await paymentRepository.create(data);
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

module.exports={
    makePayment
}