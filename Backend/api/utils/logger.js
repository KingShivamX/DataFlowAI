/**
 * Simple logging utility
 * In a production application, you might want to use a more robust logging library like winston
 */

const logger = {
    info: (message) => {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`)
    },

    warn: (message) => {
        console.warn(`[WARNING] ${new Date().toISOString()} - ${message}`)
    },

    error: (message, error) => {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`)
        if (error) {
            console.error(error)
        }
    },

    debug: (message, data) => {
        if (process.env.NODE_ENV === "development") {
            console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`)
            if (data) {
                console.debug(data)
            }
        }
    },
}

export default logger
