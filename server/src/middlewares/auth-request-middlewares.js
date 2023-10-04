const { StatusCodes }=require('http-status-codes');

const {ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { UserService } = require('../services');
const { User }=require('../models');


function validateAuthRequest(req,res,next){
    // if(!req.body.username){
    //     ErrorResponse.message='Something went wrong while authenticating a user with username';
    //     ErrorResponse.error= new AppError(['username not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
    //     return res
    //           .status(StatusCodes.BAD_REQUEST)
    //           .json(ErrorResponse);
    // }
    if(!req.body.email){
        ErrorResponse.message='Something went wrong while authenticating a user with email';
        ErrorResponse.error= new AppError(['email not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }

    if(!req.body.password){
        ErrorResponse.message='Something went wrong while authenticating a user with password';
        ErrorResponse.error= new AppError(['Password not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    next();  //saveUser is the next middleware
};


const saveUser = async (req,res,next) =>{ 
    try{
        const username = await User.findOne({
            where:{
                username: req.body.username
            },
        });
        if (username) {
            ErrorResponse.message="Something went wrong with the username";
            ErrorResponse.error= new AppError(["Username already taken"])
            return res.
                      status(StatusCodes.CONFLICT)
                      .json(ErrorResponse)
        }
        const emailCheck = await User.findOne({
            where:{
                email: req.body.email
            }
        });
        if(emailCheck){
            ErrorResponse.message="Something went wrong with email";
            ErrorResponse.error= new AppError(["Email already exists"]);
            return res
                      .status(StatusCodes.CONFLICT)
                      .json(ErrorResponse);
        }
      next();
    }catch(error){
     console.log(error);
     throw error;
    }
};



async function checkAuth(req,res,next){
   try{
    const response = await UserService.isAuthenticated(req.headers['x-access-token']);
    if(response){
        req.user = response;
        next();
    }
   }catch(error){
       return res
                 .status(error.statusCode)
                 .json(error);
   }
}

async function isAdmin(req,res,next){
    const response = await UserService.isAdmin(req.user);
    if(!response){
        return res 
                  .status(StatusCodes.UNAUTHORIZED)
                  .json({message:'User not authorized for this action'});
    }
    next();
}

module.exports={
    saveUser,validateAuthRequest,checkAuth,isAdmin
}