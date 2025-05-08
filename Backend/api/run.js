#!/usr/bin/env node

/**
 * Script to run the DataFlowAI backend API server
 */

import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import app from "./server.js"
import logger from "./utils/logger.js"
import connectDB from "./config/db.js"

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from parent directory .env file
dotenv.config({ path: path.join(__dirname, "../.env") })

const PORT = process.env.PORT || 3001

// Connect to MongoDB
connectDB()
    .then(() => {
        // Start the server
        app.listen(PORT, () => {
            logger.info(`DataFlowAI API server running on port ${PORT}`)
            logger.info(`Environment: ${process.env.NODE_ENV || "development"}`)
            logger.info(
                `API documentation available at http://localhost:${PORT}/api`
            )
        })
    })
    .catch((err) => {
        logger.error("Failed to connect to MongoDB. Server not started.", err)
        process.exit(1)
    })

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
    logger.error("Unhandled Promise Rejection:", error)
    // In a production environment, you might want to gracefully shut down
    // process.exit(1);
})

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    logger.error("Uncaught Exception:", error)
    // In a production environment, you might want to gracefully shut down
    // process.exit(1);
})
