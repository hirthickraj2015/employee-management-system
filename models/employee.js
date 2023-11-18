// Install mongoose using npm install mongoose
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Employee schema
const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
});

// Create Employee model
const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
