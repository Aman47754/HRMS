import Leave from "../models/Leave.model.js";
import Employee from "../models/Employee.model.js";
import mailSender from "../utils/mailSender.js";


export const applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate } = req.body;

    if (!leaveType || !fromDate || !toDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const leave = await Leave.create({
      employeeId: req.user.employeeRef,
      leaveType,
      fromDate,
      toDate,
      status: "PENDING"
    });

    res.status(201).json({
      message: "Leave applied successfully",
      leave
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      employeeId: req.user.employeeRef
    }).sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employeeId", "fullName email department")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;

    
    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    
    leave.status = status;
    await leave.save();

    
    const employee = await Employee.findById(leave.employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

   
    await mailSender(
      employee.email,
      `Leave ${status} Notification`,
      `
        <p>Hi ${employee.fullName},</p>
        <p>Your leave request from 
          <b>${new Date(leave.fromDate).toDateString()}</b> to 
          <b>${new Date(leave.toDate).toDateString()}</b>
          has been <b>${status}</b>.
        </p>
        <p>If you have any questions, please contact HR.</p>
        <br/>
        <p>— HRMS Team</p>
      `
    );

    res.json({
      message: `Leave ${status.toLowerCase()} successfully`,
      leave
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

