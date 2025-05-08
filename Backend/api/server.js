import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes/index.js"
import { errorHandler, notFound } from "./middleware/error.js"
import connectDB from "./config/db.js"
import logger from "./utils/logger.js"

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`)
    next()
})

// API Routes
app.use("/api", routes)

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "API is operational" })
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

export default app
