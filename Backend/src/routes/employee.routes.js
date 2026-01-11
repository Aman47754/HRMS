import express from "express";
import authMiddlewares from "../middlewares/auth.middlewares.js";
import roleMiddleware from "../middlewares/role.middlewares.js";
import { createEmployee, getAllEmployees, getEmployeeById } from "../controllers/employee.controllers.js";

const router= express.Router();

router.post('/',authMiddlewares,roleMiddleware("HR"),createEmployee);
router.get("/",authMiddlewares,roleMiddleware("HR", "MANAGER"),getAllEmployees);
router.get("/:id",authMiddlewares,getEmployeeById);

export default router;