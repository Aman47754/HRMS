import Payroll from "../models/Payroll.model.js";
import Employee from "../models/Employee.model.js";
import Attendance from "../models/Attendance.model.js";
import Leave from "../models/Leave.model.js";
import mailSender from "../utils/mailSender.js";
import generatePayslipPDF from "../utils/pdfGenerator.js"; 

/**
 * HR – Process Payroll (Workflow 5.3)
 */
export const processPayroll = async (req, res) => {
  try {
    const { employeeId, month, overtimeHours = 0 } = req.body;

    if (!employeeId || !month) {
      return res.status(400).json({ message: "Employee and month are required" });
    }

    // 1️⃣ Fetch employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Prevent duplicate payroll
    const existingPayroll = await Payroll.findOne({ employeeId, month });
    if (existingPayroll) {
      return res.status(400).json({
        message: "Payroll already processed for this month"
      });
    }

    // 2️⃣ Attendance → Working days
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const attendanceRecords = await Attendance.find({
      employeeId,
      date: { $gte: startDate, $lt: endDate }
    });

    let workingDays = 0;
    attendanceRecords.forEach(a => {
      if (a.status === "PRESENT") workingDays += 1;
      if (a.status === "HALF_DAY") workingDays += 0.5;
    });

    // 3️⃣ Approved Leaves
    const approvedLeaves = await Leave.find({
      employeeId,
      status: "APPROVED",
      fromDate: { $gte: startDate, $lt: endDate }
    });

    const leaveDays = approvedLeaves.length;

    // 4️⃣ Salary calculations
    const { basic, hra, allowances } = employee.salaryStructure;

    const perDaySalary = basic / 30;
    const leaveDeduction = leaveDays * perDaySalary;

    const overtimePay = overtimeHours * 200; // mock rate

    const grossSalary =
      basic +
      hra +
      allowances +
      overtimePay;

    // 5️⃣ Statutory deductions (mock logic)
    const pf = basic * 0.12;
    const esi = grossSalary * 0.0075;
    const tds = grossSalary > 50000 ? grossSalary * 0.1 : 0;

    const totalDeductions = pf + esi + tds + leaveDeduction;

    const netSalary = grossSalary - totalDeductions;

    // 6️⃣ Save payroll
    const payroll = await Payroll.create({
      employeeId,
      month,
      grossSalary,
      deductions: totalDeductions,
      netSalary
    });

    // 7️⃣ Generate PDF (future hook)
    const pdfPath = await generatePayslipPDF({
      employee,
      payroll
    });

    // 8️⃣ Send email
    await mailSender(
      employee.email,
      `Payslip for ${month}`,
      `
        <p>Hi ${employee.fullName},</p>
        <p>Your payroll for <b>${month}</b> has been processed.</p>
        <p><b>Net Salary:</b> ₹${netSalary}</p>
        <p>Please log in to HRMS to view details.</p>
        <br/>
        <p>— HRMS Team</p>
      `,
      [
        {
          filename: `Payslip_${month}.pdf`,
          path: pdfPath
        }
      ]
    );

    res.status(201).json({
      message: "Payroll processed and payslip emailed successfully",
      payroll
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * HR / MANAGER – View all payrolls
 */
export const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find()
      .populate("employeeId", "fullName email department")
      .sort({ createdAt: -1 });

    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * HR / MANAGER – Payroll by employee
 */
export const getPayrollByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const payrolls = await Payroll.find({ employeeId }).sort({
      createdAt: -1
    });

    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * EMPLOYEE – View own payroll
 */
export const getMyPayroll = async (req, res) => {
  try {
    const payrolls = await Payroll.find({
      employeeId: req.user.employeeRef
    }).sort({ createdAt: -1 });

    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
