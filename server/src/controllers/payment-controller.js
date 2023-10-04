const {StatusCodes} = require('http-status-codes');
const {PaymentService} = require('../services')
const {SuccessResponse,ErrorResponse} = require('../utils/common')


async function makePayment(req,res){
   try{
     const payment= await PaymentService.makePayment({
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      locationName: req.body.locationName,
      slot: req.body.slot,
      vehicleNumber: req.body.vehicleNumber,
      duration: req.body.duration,
      cardNumber: req.body.cardNumber,
      cvv: req.body.cvv,
      expiryDate: req.body.expiryDate,
      amount: req.body.amount
     });
     SuccessResponse.data=payment;
     return res
               .status(StatusCodes.CREATED)
               .json(SuccessResponse)
   }catch(error){
    console.log(error);
    ErrorResponse.error=error;
    return res
              .status(error.statusCode)
              .json(ErrorResponse);
   }
}

module.exports={
    makePayment
}