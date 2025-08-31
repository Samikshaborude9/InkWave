import mongoose from "mongoose";

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (error : unknown){
    if(error instanceof Error){
      console.error("MongoDB connection error", error.message);
    }
    else{
      console.error("MongoDB connection Error", error);
    }
    process.exit(1); //stops the app with error code
  }

};
export default connectDB;