const CrudRepository = require('./crud-repository');
const { Payment } = require('../models')

class PaymentRepository extends CrudRepository {
    
    constructor (){
        super(Payment);
    }

    async getUserByMobileNumber(mobileNumber){
        const user = await Payment.findOne({where: { mobileNumber : mobileNumber}})
        return user;
    }

}

module.exports= PaymentRepository;