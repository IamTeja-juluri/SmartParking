const {StatusCodes} = require('http-status-codes')
const { UserService }=require('../services');
const {SuccessResponse,ErrorResponse}=require('../utils/common')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {ServerConfig} = require('../config')
const { Auth } = require('../utils/common')

 
async function signUp(req,res){

    try{
        console.log(req.body);
        const password  = bcrypt.hashSync(req.body.password,+ServerConfig.SALT_ROUNDS)
        const user= await UserService.signUp({username:req.body.username,
                                              email:req.body.email,
                                              password: password
                                            });
       if(user){
            let token = jwt.sign({ id:user.id,email:user.email},ServerConfig.JWT_SECRET,{
            expiresIn: ServerConfig.JWT_EXPIRY });
            res.cookie("jwt",token,{maxAge:1*24*60*60*1000,httpOnly:true})
            console.log(token);
        }else{
            ErrorResponse.data="Details are not correct";
            return res
                    .status(StatusCodes.CONFLICT)
                    .json(ErrorResponse)
       }
       SuccessResponse.data=user;
       return res
              .status(StatusCodes.CREATED)
              .json(SuccessResponse);
    }
    catch(error){
            console.log("error=",error);
            ErrorResponse.error=error;
            return res.
                status(error.statusCode)
                .json(ErrorResponse);  
    }
}

async function signIn(req,res){

    try{
        const user= await UserService.signIn({
           email:req.body.email,
           password:req.body.password
       });
    //    res.cookie("jwt",user.data,{maxAge:1*1000,httpOnly: true});
       SuccessResponse.data=user;
       return res
              .status(StatusCodes.CREATED)
              .json(SuccessResponse);
    }
    catch(error){
        console.log(error)
        ErrorResponse.error=error;
        return res.
              status(error.statusCode)
              .json(ErrorResponse);  
    }
    
}



async function addRoletoUser(req,res){

    try{
        const user= await UserService.addRoletoUser({
           role:req.body.role,
           id:req.body.id
       });
    
       SuccessResponse.data=user;
       return res
              .status(StatusCodes.CREATED)
              .json(SuccessResponse);
    }
    catch(error){
        console.log(error)
        ErrorResponse.error=error;
        return res.
              status(error.statusCode)
              .json(ErrorResponse);  
    }
}

module.exports={signUp,signIn,addRoletoUser}