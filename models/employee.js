
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
  id: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
