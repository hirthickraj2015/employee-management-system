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

app.get('/',async (req,res) =>{
    try {
        // Fetch all employees for display
        const employees = await Employee.find();
        res.render('home', { employees });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})



                            //************Adding Employee***************//

app.get('/addEmployee', (req, res) => {
    res.render('addEmployee', { employee: {} });
});

app.post('/addEmployee', async (req, res) => {
    try {
        const { id, name, dob, salary, dept } = req.body;

        // Calculate age based on provided date of birth
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();

        // Adjust age if birthday hasn't occurred yet this year
        if (today.getMonth() < dobDate.getMonth() || (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate())) {
            age--;
        }

        // If _id is empty, MongoDB will generate it automatically
        await Employee.create({ id, name, dob, age, salary, dept });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});



                             //*************Display Employee************//

app.get('/allEmployee', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render('allEmployee', { employees });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


                              //****************Update Employee***************//


app.get('/getEmployeeId', (req, res) => {
    res.render('getEmployeeId');
});

app.post('/getEmployeeId', async (req, res) => {
    try {
        const emid= req.body.employeeId;
        const employee = await Employee.findOne({ id: emid });
        if (!employee) {
            // Employee with the specified ID does not exist
            return res.status(404).send('Employee not found');
        }

        res.render('updEmployee', { employee });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/updEmployee', async (req, res) => {
    try {
        const { id, name, dob, salary, dept } = req.body;
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();

        if (today.getMonth() < dobDate.getMonth() || (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate())) {
            age--;
        }

        // Update the employee
        await Employee.findOneAndUpdate({ id }, { name, dob, age, salary, dept });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

                            //*******************Delete Employee***************//

app.get('/delEmployeeId', (req, res) => {
    res.render('delEmployeeId');
});

app.post('/delEmployeeId', async (req, res) => {
    try {
        const employeeId = req.body.employeeId;
        const employee = await Employee.findOne({ id: employeeId });

        if (!employee) {
            // Employee with the specified ID does not exist
            return res.status(404).send('Employee not found');
        }

        // Delete the employee
        await Employee.findOneAndDelete({ id: employeeId });
        
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});      



                  //*****************Search Employee*******************//

app.get('/findEmployee', (req, res) => {
    res.render('findEmployee');
});

app.post('/findEmployee', async (req, res) => {
    try {
        const searchInput = req.body.searchInput;

        // Check if the search input is a valid date
        const isDate = !isNaN(Date.parse(searchInput));

        // Find by ID, name, or date of birth
        let query;
        if (isDate) {
            // If the search input is a valid date, search only by name and ID
            query = { $or: [{ id: searchInput }, { name: { $regex: searchInput, $options: 'i' } }] };
        } else {
            // If the search input is not a valid date, search by name, ID, and date of birth
            query = {
                $or: [
                    { id: searchInput },
                    { name: { $regex: searchInput, $options: 'i' } },
                ]
            };
        }

        const employees = await Employee.find(query);

        res.render('findEmployeeResults', { employees, searchInput });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});



                  //********************Filter Employee*********************//

app.get('/filterEmployee', (req, res) => {
    res.render('filterEmployee');
});

app.post('/filterEmployee', async (req, res) => {
    try {
        const { age, salary, dept } = req.body;
        let query = {};

        // Add conditions based on provided filters
        if (age && !isNaN(parseInt(age.min)) && !isNaN(parseInt(age.max))) {
            query.age = { $gte: parseInt(age.min), $lte: parseInt(age.max) };
        }
        

        if (salary && !isNaN(parseFloat(salary.min)) && !isNaN(parseFloat(salary.max))) {
            query.salary = { $gte: parseFloat(salary.min), $lte: parseFloat(salary.max) };
        }

        if (dept) {
            query.dept = { $regex: dept, $options: 'i' };
        }

        const employees = await Employee.find(query);

        res.render('filterEmployeeResults', { employees, filters: { age, salary, dept } });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});



                        //*******************Average Calculation****************//

app.get('/averageSalary', async (req, res) => {
    try {
        const departments = await Employee.distinct('dept');
        res.render('averageSalary', { departments });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/averageSalary', async (req, res) => {
    try {
        const { choice, department } = req.body;
        let average;

        if (choice === 'total') {
            // Calculate total average salary of all employees
            const employees = await Employee.find();
            const totalSalary = employees.reduce((sum, employee) => sum + employee.salary, 0);
            average = totalSalary / employees.length;
        } else if (choice === 'department' && department) {
            // Calculate average salary based on department
            const employees = await Employee.find({ dept: department });
            if (employees.length > 0) {
                const totalSalary = employees.reduce((sum, employee) => sum + employee.salary, 0);
                average = totalSalary / employees.length;
            } else {
                return res.status(404).send('No employees found in the specified department.');
            }
        } else {
            return res.status(400).send('Invalid choice or missing department.');
        }

        res.render('averageSalaryResult', { choice, department, average });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


connectDB().then(()=>{
    app.listen(PORT,()=> {
        console.log(`Listening on port ${PORT}`);
    })
});