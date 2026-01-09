import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LEAVE"],
      required: true
    },
    mode: {
      type: String,
      enum: ["FACE", "BIOMETRIC", "MANUAL"],
    }
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
