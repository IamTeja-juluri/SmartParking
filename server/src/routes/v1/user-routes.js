const express = require('express');

const router = express.Router();
const { UserController,PaymentController } = require('../../controllers')
const { AuthRequestMiddlewares } = require('../../middlewares')

router.post('/signup',AuthRequestMiddlewares.validateAuthRequest,AuthRequestMiddlewares.saveUser,UserController.signUp);
router.post('/signin',AuthRequestMiddlewares.validateAuthRequest,UserController.signIn);
router.post('/role',AuthRequestMiddlewares.checkAuth,AuthRequestMiddlewares.isAdmin,UserController.addRoletoUser);
router.post('/payment',PaymentController.makePayment)

module.exports=router;