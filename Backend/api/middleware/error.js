/**
 * Error handling middleware
 */

export const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`)

    // Log the stack trace in development
    if (process.env.NODE_ENV === "development") {
        console.error(err.stack)
    }

    // Default status is 500 - Internal Server Error
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    // Check for Mongoose validation errors
    if (err.name === "ValidationError") {
        statusCode = 400
        const messages = Object.values(err.errors).map((val) => val.message)
        message = messages.join(", ")
    }

    // Check for Mongoose bad ObjectId
    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404
        message = "Resource not found"
    }

    // Send the error response
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    })
}

/**
 * 404 Not Found middleware
 */
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}
