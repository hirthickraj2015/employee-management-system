//jshint esversion:6
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import Employee from  './models/employee.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.set('strictQuery',false);
const connectDB= async ()=> {
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

//***********Home Page Route*************//

app.get('/',(req,res) =>{
    res.send("HI");
})


app.get('/addEmployee', async(req,res)=>{
    try {
       await Employee.create([
        {   name : "Ram",
            age : 27,
            dob : new Date('1993-01-15'),
            salary : 50000,
            dept : 'IT'
        }
        ]) 

    } catch (error) {
        console.log(error);
    }
});


app.get('/allEmployee', async(req,res)=>{
    const employee= await Employee.find();

    if(employee){
        res.json(employee)
    }else{
        res.send("Something is wrong");
    }
});










connectDB().then(()=>{
    app.listen(PORT,()=> {
        console.log(`Listening on port ${PORT}`);
    })
});