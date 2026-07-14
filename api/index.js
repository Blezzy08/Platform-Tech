import dotenv from 'dotenv';
import connectDB from '../backend/src/config/database.js';
import app from "../backend/src/app.js";

dotenv.config({
    path: `./.env`
});

let isConnected = false;

export default async function handler(req, res) {
    if (!isConnected) {
        try {
            await connectDB();
            isConnected = true;
        } catch (err) {
            console.error("DB connection error in serverless handler:", err);
        }
    }
    return app(req, res);
}
