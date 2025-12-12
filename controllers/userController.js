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
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error:'Invalid email format'});
        }
        
        if(password.length < 6){
            return res.status(400).json({error:'Password must be at least 6 characters'});
        }
        
        const existingUser = await User.findOne({where:{email}});
        if(existingUser){
            return res.status(409).json({error:'User with this email already exists'});
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
    try{
        const {email,password}=req.body;
        
        // Validate input
        if(!email || !password){
            return res.status(400).json({message:'Email and password are required'});
        }
        
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
        username:user.username,
        email:user.email,
        role:user.role,
        accessToken:jwtToken
    });
    }catch(err){
        console.error('Login error:',err);
        res.status(500).json({message:'Internal server error'});
    }
}



module.exports={
    register ,
    login
};