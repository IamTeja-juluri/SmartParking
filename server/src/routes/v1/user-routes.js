const express = require('express');

const router = express.Router();
const { UserController } = require('../../controllers')
const { AuthRequestMiddlewares } = require('../../middlewares')

router.post('/signup',AuthRequestMiddlewares.validateAuthRequest,AuthRequestMiddlewares.saveUser,UserController.signUp);
router.post('/signin',AuthRequestMiddlewares.validateAuthRequest,UserController.signIn);
router.post('/role',AuthRequestMiddlewares.checkAuth,AuthRequestMiddlewares.isAdmin,UserController.addRoletoUser);


module.exports=router;