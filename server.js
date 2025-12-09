const express=require('express')
const sequelize=require('./config/database');
const app=express();
const port=3000

app.use(express.json());

const userRoutes=require('./routes/users');
app.use('/user',userRoutes);


sequelize.sync().
then(()=>{
    app.listen (port,()=>{
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err)=>{
    console.error('DB CONNECTION ERROR :',err);
}
);