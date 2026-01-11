import Employee from "../models/Employee.model.js";

import generateEmployeeId from "../utils/generateEmployeeId.js";

export const createEmployee = async (req,res)=>{

    const employee= await Employee.create({
        ...req.body,
        employeeId:generateEmployeeId()

    });
    res.status(201).json(employee);

}
export const getAllEmployees = async(req,res)=>{
    const employees = await Employee.find();
    res.json(employees);
}
export const getEmployeeById = async(req,res)=>{

    try {
        const {id}=req.params;
    
        const employee = await Employee.findById(id);
        if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
        }
    
        //access control- hr,manager and employee can see only this id 
        if (
          req.user.role === "EMPLOYEE" &&
          req.user.employeeRef?.toString() !== id
        ) {
          return res.status(403).json({ message: "Access denied" });
        }
    
        
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}