import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mailSender from "../utils/mailSender.js";
import Employee from "../models/Employee.model.js";
import employeeCredentials from "../mailTemplate/employeeCredentials.js";

export const login =async (req,res)=>{
    try {
        const {email,password}=req.body;

        const user= await User.findOne({email});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });

        const payload={
            id: user._id,
            role: user.role,
            employeeRef: user.employeeRef || null

        }

        const token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});
        res.json({
            token,
            role: user.role,
            employeeRef: user.employeeRef
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const register =async(req,res)=>{

    try {
        const {email,password,role,employeeRef}=req.body;
    
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "User already exists" }); 
        }

        const employee = await Employee.findById(employeeRef);
        if (!employee) {
            return res.status(400).json({ message: "Employee not found, create the employee first" });
        }



        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
    
        const newUser={
            email,
            password:hashedPassword,
            role,
            employeeRef:employeeRef || null
        }
        
        
        await mailSender(
            email,
            "Your HRMS Login Credentials",
            employeeCredentials(
                employee.fullName,
                email,
                password
            )
        );
        const user= await User.create(newUser);
        
        return res.status(201).json({
            message:"user registered successfully",
            userId:user._id
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

