import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/authRoute.js"
import userRoutes from "./routes/userRoute.js"
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["https://jobtracker-mern-1-hyok.onrender.com"],
    credentials: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/v1', userRoutes)

app.listen(3001, () => {
    console.log("Server is Running on https://jobtracker-mern-0i5g.onrender.com")
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Database connected✅");
    }).catch((err) => {
        console.log("mongodb connection error", err);
    })
})
