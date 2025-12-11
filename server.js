const express=require('express')
const sequelize=require('./config/database');
const app=express();
const port=3000
const cors=require('cors');
app.use(cors());
app.use(express.json());

const userRoutes=require('./routes/users');
app.use('/user',userRoutes);
app.use('/task',require('./routes/task'));


sequelize.sync().
then(()=>{
    app.listen (port,()=>{
        console.log(`Okie http://localhost:${port}`);
    });
}).catch((err)=>{
    console.error('DB CONNECTION ERROR :',err);
}
);