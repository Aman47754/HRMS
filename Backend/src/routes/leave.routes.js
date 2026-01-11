import express from "express";
import authMiddleware from "../middlewares/auth.middlewares.js";
import roleMiddleware from "../middlewares/role.middlewares.js";

import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
} from "../controllers/leave.controllers.js";

const router = express.Router();

router.post(
  "/apply",
  authMiddleware,
  roleMiddleware("EMPLOYEE"),
  applyLeave
);


router.get(
  "/my",
  authMiddleware,
  roleMiddleware("EMPLOYEE"),
  getMyLeaves
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("HR", "MANAGER"),
  getAllLeaves
);


router.patch(
  "/:leaveId/status",
  authMiddleware,
  roleMiddleware("HR", "MANAGER"),
  updateLeaveStatus
);

export default router;
