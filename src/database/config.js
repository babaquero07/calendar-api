import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};
