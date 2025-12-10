const SECRET="mogeshm"

const jwt=require('jsonwebtoken');

function authenticateToken(req,res,next){
    const token=req.headers['authorization'];
    if(!token){
        return res.status(401).json({message:'No token provided'});
    }
    jwt.verify(token,SECRET,(err,decoded)=>{
        if(err){
            return res.status(403).json({message:'Failed to authenticate token'});
        }
        req.user=decoded.id;
        req.role=decoded.role;
        next();
    });
}

function adminOnly(req,res,next){
    if(req.role!=='admin'){
        return res.status(403).json({message:'Admin only'});
    }
    next();
}
module.exports={SECRET, authenticateToken, adminOnly};