const bycrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

async function hashPassword(password) {  
    if(!password) throw new Error('Password is required for hashing');
    const hashPass=await bycrypt.hash(password,10);
    return hashPass;
}
module.exports= {
    hashPassword
}; 