import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DATABASE } =
  process.env;

const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;

export async function connectDB() {
  try {
    const connection = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MognoDb connection error:", error);
    process.exit(1);
  }
}
