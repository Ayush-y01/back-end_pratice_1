import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/myDatabase')
        console.log("MongoDb Database connected");
        
    } catch (error) {
        console.log("Database connection Failed", error.message);
        process.exit(1)
        
    }
}

export default connectDB

