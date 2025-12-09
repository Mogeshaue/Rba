const { DataTypes,Model}=require('sequelize');
const sequelize=require('../config/database');
const User=require('./user');

const Task=sequelize.define('Task',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        }
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
})
User.hasMany(Task,{foreignKey:'userId'});
Task.belongsTo(User,{foreignKey:'userId'});

module.exports=Task;