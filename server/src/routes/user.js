import express from "express";
import { login, profile, signUp } from "../controllers/user.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/profile",auth, profile)

export default router