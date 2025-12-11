const User=require('../models/user');
const {hashPassword}=require('../utils');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {SECRET}=require('../middleware/auth');

async function  register(req,res){
    try{
        const {username,email,password,role}=req.body;
        console.log("Registering user:", req.body);
        
        if(!username || !email || !password){
            return res.status(400).json({error:'Username, email and password are required'});
        }
        
        const hashedPassword=await hashPassword(password);
        const newUser=await User.create({
            username,
            email,
            password:hashedPassword,
            role:role || 'user'
        });
        
        res.status(201).json({success:true,message:'User created',user:{
            id:newUser.id,
            username:newUser.username,
            email:newUser.email,
            role:newUser.role
        }});
    }catch(err){
        console.error('Registration error:',err);
        res.status(500).json({success:false,error:'Error creating user',details:err.message});
    }
}


async  function login(req,res){

    const {email,password}=req.body
    const user=await User.findOne({where:{email}});
    console.log("Login attempt for email:", email);
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