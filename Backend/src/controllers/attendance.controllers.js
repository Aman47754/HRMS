import Attendance from "../models/Attendance.model.js";

export const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status, mode } = req.body;

    // Employee can only mark their own attendance
    if (
      req.user.role === "EMPLOYEE" &&
      req.user.employeeRef.toString() !== employeeId
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const attendance = await Attendance.create({
      employeeId,
      date,
      status,
      mode
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


