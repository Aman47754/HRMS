import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },
    month: {
      type: String,
      required: true
      // example: "2026-01"
    },
    grossSalary: {
      type: Number,
      required: true
    },
    deductions: {
      type: Number,
      default: 0
    },
    netSalary: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const Payroll = mongoose.model("Payroll", payrollSchema);

export default Payroll;
