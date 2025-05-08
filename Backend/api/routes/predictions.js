import express from "express"
import {
    getAllPredictions,
    getPredictionById,
    createPrediction,
    deletePrediction,
} from "../controllers/predictionController.js"

const router = express.Router()

/**
 * @route   GET /api/predictions
 * @desc    Get all predictions
 * @access  Public
 */
router.get("/", getAllPredictions)

/**
 * @route   POST /api/predictions/create
 * @desc    Make a new prediction
 * @access  Public
 */
router.post("/create", createPrediction)

/**
 * @route   GET /api/predictions/:id
 * @desc    Get prediction by ID
 * @access  Public
 */
router.get("/:id", getPredictionById)

/**
 * @route   DELETE /api/predictions/:id
 * @desc    Delete a prediction
 * @access  Public
 */
router.delete("/:id", deletePrediction)

export default router
