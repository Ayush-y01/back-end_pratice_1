import User from "../models/user.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import Todo from "../models/todo.js";

export const signUp = async (req, res,next) => {
    const {name, email, phone, password} = req.body

    if (!name || !email || !phone || !password) {
        return res.status(401).json({
            message:"All the Field are required"
        })
    }
    
    const findUser = await User.findOne({email})

    if (findUser) {
        return res.status(401).json({
            message:"User Already have account"
        })
    }

    const user = await User.create(req.body)

    const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "7d"})


    return res.status(201).json({
        message:"User register successfull",
        token,
        user
    })
}

export const login = async (req, res,next) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(401).json({
            message:"All the Field are required"
        })
    }

    const user = await User.findOne({email}).select("+password")

    if (!user) {
    return res.status(401).json({
        message: "Invalid Email or Password"
    });
}

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({
            message:"Invalid Credentials"
        })
    }

    if (!user) {
        return res.status(401).json({
            message:"Unable to login"
        })
    }

    const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "7d"})


    return res.status(200).json({
            message:"Login successfull",
            token
        })
}

export const profile = async (req, res, next) => {
    return res.status(200).json({
        message:"Welcome Back",
        id: req.user._id
    })
}

export const addTodo = async (req, res, next) => {
    const user = req.user.id

    if (!user) {
        return res.status(401).json({
            message:"Please login first"
        })
    }

    const {title, task} = req.body

    if (!title) {
         return res.status(400).json({
            message:"Title is required"
        })
    }

    const todo = await Todo.create({
        title,
        task
    })

    return res.status(201).json({
        message:"todo create successfully",
        id: req.user._id,
        todo
    })
}

export const deleteTodo = async (req, res, next) => {
    const user = req.user.id

    if (!user) {
        return res.status(401).json({
            message:"Please login first"
        })
    }
    const todoId = req.params.id 
    
    const todo = await Todo.findByIdAndDelete({
        _id: todoId,
        user:user
    })
    
    return res.status(200).json({
        message:"Todo Deleted successfully"
    })
}