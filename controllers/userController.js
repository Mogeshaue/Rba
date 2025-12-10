const User=require('../models/user');
const {hashPassword}=require('../utils');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {SECRET}=require('../middleware/auth');

async function register(req,res){
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


async  function login(req,res){
    const {email,password}=req.body
    const user=await User.findOne({where:{email}});
    if(!user){
        return res.status(404).json({message:'Not found'})
    }
    const loginpassword=await bcrypt.compare(password,user.password)
    if(!loginpassword){
        return res.status(401).json({message:'Invalid pass'})
    }
    const jwtToken=jwt.sign({id:user.id,role:user.role},SECRET,{
        expiresIn:50000
    })
    res.status(200).json({
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
        accessToken:jwtToken
        })
}



module.exports={
    register ,
    login
};