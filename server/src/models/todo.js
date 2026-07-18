import mongoose from "mongoose";

const todo = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    task:{
        type:String,
    },

},{timestamps:true})

const Todo = mongoose.model("Todo",todo)

export default Todo