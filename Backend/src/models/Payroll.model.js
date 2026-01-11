import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  month: String,

  earnings: {
    basic: Number,
    hra: Number,
    allowances: Number,
    overtime: Number
  },

  deductions: {
    pf: Number,
    esi: Number,
    tds: Number,
    leave: Number
  },

  grossSalary: Number,
  netSalary: Number,

  payslipUrl: String
});

const Payroll = mongoose.model("Payroll", payrollSchema);

export default Payroll;