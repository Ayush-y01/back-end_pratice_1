import express from "express";
import { addTodo, deleteTodo, searchTodo, updateTodo} from "../controllers/user.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/add",auth, addTodo)
router.patch("/del/:id",auth, deleteTodo)
router.put("/edit/:id", auth, updateTodo)
router.get("/search",auth, searchTodo)


export default router