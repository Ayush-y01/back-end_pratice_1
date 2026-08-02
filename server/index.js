import express from "express";
import dotenv from "dotenv"
import connectDB from "./src/DB/connection.js"
import UserRouter from "./src/routes/user.js"
import TodoRouter from "./src/routes/todo.js"
import cors from "cors"

dotenv.config()


connectDB()

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())

app.use("/user", UserRouter)
app.use("/todo", TodoRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})