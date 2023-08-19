import mongoose from "mongoose";

const EmployeeUserSchema  = new mongoose.Schema({

  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String
    
  },
  email: {
    type: String,
    
  },
  password: {
    type: String,
    required: true
  },
 
  EmployeeId: {
    type: Number  
  },
  EmployeeType: {
    type: String  
  },
  TheatreID: {
    type: Number  
  },
  
 

});

const EmployeeUser = mongoose.model("employeeCollectionion", EmployeeUserSchema);
export default EmployeeUser;
