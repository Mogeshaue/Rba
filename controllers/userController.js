const User=require('../models/user');
const {hashPassword}=require('../utils');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

function createUser(req,res){
    const {username,email,password,role}=req.body;
    hashPassword(password)
    .then((hashedPassword)=>{
        return User.create({
            username,
            email,
            password:hashedPassword,
            role
        });
    }).then((newUser)=>{
        res.status(201).json({message:'User created',user:newUser});
    }).catch((err)=>{
        res.status(500).json({error:'Error creating user',details:err.message});
    });
}



module.exports={
    createUser,
};