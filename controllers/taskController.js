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
    console.log("getTasks called");
    const {userId,userRole}=req.user;
    console.log("UserID:", userId, "UserRole:", userRole);
    let tasks
    // tasks=await Task.findAll()
    if(userRole==='admin'){
        tasks=await Task.findAll()
    }else if(userRole==='user'){
        console.log("User access");
        tasks=await Task.findAll({where:{userId:userId}})

    }
    console.log("Tasks:", tasks);
    res.status(200).json(tasks);
}

module.exports={createTask, getTasks};