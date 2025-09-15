const express=require('express');
const Joi=require('joi');
const config= require('config');
const cors =require('cors');
const path = require('path');
const studentDetails=require('./router/detail');
const todoDetails=require('./router/todo');


const app = express();


app.use(express.json());
app.use(cors());


app.use('/student',studentDetails);
app.use('/todo',todoDetails);

const port=5000;
app.listen(port,()=>{
    console.log(`listeing on port ${port}`)
    
})