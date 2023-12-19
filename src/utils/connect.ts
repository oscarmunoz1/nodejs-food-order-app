import config from "config";
import mongoose from "mongoose";

export async function connect() {
  const dbUri = config.get("dbUri") as string;

  try {
    await mongoose.connect(dbUri);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection failed");
    process.exit(1);
  }
}
