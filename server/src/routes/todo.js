import express from "express";
import { addTodo, deleteTodo} from "../controllers/user.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/add",auth, addTodo)
router.patch("/del/:id",auth, deleteTodo)


export default router