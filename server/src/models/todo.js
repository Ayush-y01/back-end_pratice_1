import mongoose from "mongoose";

const todo = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
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