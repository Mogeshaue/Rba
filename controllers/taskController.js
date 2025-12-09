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

module.exports={createTask};