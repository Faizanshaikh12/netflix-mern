import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connection = () => {
    const DB = process.env.MONGO_URL;
    try {
        mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('database connected')
    } catch (err) {
        console.log(err)
    }
}
