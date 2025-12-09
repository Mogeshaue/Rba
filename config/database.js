const{ Sequelize }=require('sequelize');
const path=reqiuire(path)

const sequelize=new Sequelize({
    dialect:'sqlite',
    storage:path.join(__dirname,'../database.sqlite'),
});

module.exports=sequelize;