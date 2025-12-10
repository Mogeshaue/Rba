const Task=require('../models/task');


function createTask(req,res){
    const {userId,title,description}=req.body;
    Task.create({ 
        userId,
        title,
        description
    }).then(task=>{
        res.status(201).json(task);
    }).catch(error=>{
        res.status(400).json({error:error.message});
    });
}

async function getTasks(req,res){
    const {userId,userRole}=req.user;
    let tasks
    if(userRole==='admin'){
        tasks=await Task.findAll()
    }elseif(userRole==='user'){
        tasks=await Task.findAll({where:{userId:userId}})
    }
    res.status(200).json(tasks);
}

module.exports={createTask, getTasks};