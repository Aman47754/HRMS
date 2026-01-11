import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["HR", "MANAGER", "EMPLOYEE"],
      default:"EMPLOYEE",
    },
    employeeRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
