import mongoose from "mongoose";

const URL: string = process.env.MONGO_URI!;
const connectdb = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to mongodb");
  } catch (err) {
    console.log("Error conneting to mongodb " + err);
    process.exit(1);
  }
};
export default connectdb;
