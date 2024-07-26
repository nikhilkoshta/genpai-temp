import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connect = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI as string);
        return conn;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to connect to MongoDB");
    }
};