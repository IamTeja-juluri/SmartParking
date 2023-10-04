const {StatusCodes} = require('http-status-codes');
const {PaymentService} = require('../services')
const {SuccessResponse,ErrorResponse} = require('../utils/common')


async function makePayment(req,res){
   try{
     const payment= await PaymentService.makePayment({
      name: req.body.name,
      
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