import express from "express";
import authMiddleware from "../middlewares/auth.middlewares.js";
import roleMiddleware from "../middlewares/role.middlewares.js";

import {
  processPayroll,
  getAllPayrolls,
  getPayrollByEmployee,
  getMyPayroll
} from "../controllers/payroll.controllers.js";

const router = express.Router();

/**
 * HR – Process payroll for an employee (New Payroll Cycle)
 */
router.post(
  "/process",
  authMiddleware,
  roleMiddleware("HR"),
  processPayroll
);

/**
 * HR / MANAGER – View all payrolls
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("HR", "MANAGER"),
  getAllPayrolls
);

/**
 * HR / MANAGER – View payroll of a specific employee
 */
router.get(
  "/employee/:employeeId",
  authMiddleware,
  roleMiddleware("HR", "MANAGER"),
  getPayrollByEmployee
);

/**
 * EMPLOYEE – View own payroll
 */
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("EMPLOYEE"),
  getMyPayroll
);

export default router;
