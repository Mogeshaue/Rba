const {DataTypes, Model}=require('sequelize');
const sequelize=require('../config/database');
const bycrypt=require('bcrypt');


const User=sequelize.define('User',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'user',
        validate:{
            isIn:[['user','admin']]
        }
    }
});

module.exports=User;