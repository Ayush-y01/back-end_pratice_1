import express from "express";
import { addTodo, login, profile, signUp } from "../controllers/user.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/add",auth, addTodo)

export default router