const SECRET="mogeshm"

const jwt=require('jsonwebtoken');

function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1]; 
    console.log("Token:", token);
    if(!token){
        return res.status(401).json({message:'No token provided'});
    }
    jwt.verify(token,SECRET,(err,decoded)=>{
        console.log("Error:", err);
        if(err){
            return res.status(403).json({message:'Failed to authenticate token'});
        }
        req.user={
            userId:decoded.id,
            userRole:decoded.role
        };
        next();
    });
}

function adminOnly(req,res,next){
    if(!req.user || req.user.userRole!=='admin'){
        return res.status(403).json({message:'Admin access only'});
    }
    next();
}
module.exports={SECRET, authenticateToken, adminOnly};