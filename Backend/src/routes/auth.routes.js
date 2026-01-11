import express from "express"

import { login, register } from "../controllers/auth.controllers.js";
import authMiddlewares from "../middlewares/auth.middlewares.js";
import roleMiddleware from "../middlewares/role.middlewares.js";
const router= express.Router();


router.post('/login',login);

router.post("/register",authMiddlewares,roleMiddleware("HR"),register);

export default router;