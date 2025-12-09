const express=require('express');
const routes=express.Router();
const controller=require('../controllers/userController');

routes.post('/createUser',controller.createUser);
// routes.post('/login',controller.loginUser);
module.exports=routes;

