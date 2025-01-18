import mongoose from 'mongoose';

export const connectToMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect('mongodb+srv://Hariharan:Ki65AToRLAGbg3Xa@cluster1.qbeja.mongodb.net/MrFit', {
            serverSelectionTimeoutMS: 30000,
        });
        console.log("Successfully connected to MongoDB Atlas");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
    mongoose.connection.on("connected", () => {
        console.log("Mongoose connected to DB");
    });
    mongoose.connection.on("error", (err) => {
        console.error("Mongoose connection error:", err);
    });
    mongoose.connection.on("disconnected", () => {
        console.log("Mongoose disconnected from DB");
    });
};
