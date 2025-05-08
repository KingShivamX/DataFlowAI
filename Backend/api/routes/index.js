import express from "express"
import dataRoutes from "./data.js"
import modelRoutes from "./models.js"
import predictionRoutes from "./predictions.js"

const router = express.Router()

// Add route groups
router.use("/data", dataRoutes)
router.use("/models", modelRoutes)
router.use("/predictions", predictionRoutes)

// API root endpoint
router.get("/", (req, res) => {
    res.json({
        message: "Welcome to DataFlowAI API",
        version: "1.0.0",
        endpoints: {
            data: "/api/data",
            models: "/api/models",
            predictions: "/api/predictions",
        },
    })
})

export default router
