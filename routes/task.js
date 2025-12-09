const express=require('express');
const routes=express.Router();
const controller=require('../controllers/taskController');

routes.post('/createTask',controller.createTask);

module.exports=routes;