import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String
    },
    department: {
      type: String
    },
    designation: {
      type: String
    },
    salaryStructure: {
      basic: {
        type: Number,
        default: 0
      },
      hra: {
        type: Number,
        default: 0
      },
      allowances: {
        type: Number,
        default: 0
      },
      deductions: {
        type: Number,
        default: 0
      }
    }
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
