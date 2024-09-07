import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/authRoute.js"
import userRoutes from "./routes/userRoute.js"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

mongoose.connect('mongodb://127.0.0.1:27017/school').then(() => {
    console.log("Database connected✅");
})

app.use('/api/auth', authRoutes)
app.use('/api/v1', userRoutes)
app.get('/test', (req, res) => {
    const cookie = req.cookies
    console.log(cookie);
    res.json({ cookie })
})


app.listen(3001, () => {
    console.log("Server is Running on http://localhost:3001")
})
