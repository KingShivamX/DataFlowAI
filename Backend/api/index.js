import app from "./server.js"
import dotenv from "dotenv"
import logger from "./utils/logger.js"

// Load environment variables
dotenv.config()

const PORT = process.env.PORT || 3001

// Start the server
app.listen(PORT, () => {
    logger.info(`API server running on port ${PORT}`)
    logger.info(`Environment: ${process.env.NODE_ENV || "development"}`)
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
