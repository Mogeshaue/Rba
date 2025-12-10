const express=require('express');
const routes=express.Router();
const controller=require('../controllers/taskController');
const { verify } = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/auth');

routes.post('/createTask',controller.createTask);
routes.get('/',authenticateToken, controller.getTasks);

module.exports=routes;