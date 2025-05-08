import Prediction from "../models/Prediction.js"
import Model from "../models/Model.js"
import logger from "../utils/logger.js"

/**
 * @desc    Get all predictions
 * @route   GET /api/predictions
 * @access  Public
 */
export const getAllPredictions = async (req, res, next) => {
    try {
        const predictions = await Prediction.find({})
            .select("model input output createdAt")
            .populate("model", "name type")

        res.status(200).json({
            success: true,
            count: predictions.length,
            data: predictions,
        })
    } catch (error) {
        logger.error("Error fetching predictions", error)
        next(error)
    }
}

/**
 * @desc    Get a single prediction by ID
 * @route   GET /api/predictions/:id
 * @access  Public
 */
export const getPredictionById = async (req, res, next) => {
    try {
        const prediction = await Prediction.findById(req.params.id).populate(
            "model",
            "name type"
        )

        if (!prediction) {
            res.status(404)
            throw new Error("Prediction not found")
        }

        res.status(200).json({
            success: true,
            data: prediction,
        })
    } catch (error) {
        logger.error(`Error fetching prediction ${req.params.id}`, error)
        next(error)
    }
}

/**
 * @desc    Create a new prediction
 * @route   POST /api/predictions/create
 * @access  Public
 */
export const createPrediction = async (req, res, next) => {
    try {
        const { modelId, data } = req.body

        // Validate required fields
        if (!modelId || !data) {
            res.status(400)
            throw new Error("Please provide modelId and data")
        }

        // Check if model exists and is trained
        const model = await Model.findById(modelId)
        if (!model) {
            res.status(404)
            throw new Error("Model not found")
        }

        if (model.status !== "trained") {
            res.status(400)
            throw new Error("Model is not trained yet")
        }

        // In a real implementation, this would use the trained model to make a prediction
        // For now, we'll create a mock prediction
        let output
        let confidence = Math.random() * 0.3 + 0.7 // Random confidence between 0.7 and 1.0

        // Generate different outputs based on model type
        switch (model.type) {
            case "linearRegression":
            case "logisticRegression":
                output = Math.random() * 100
                break
            case "knn":
            case "kmeans":
                output = Math.floor(Math.random() * 5) // Class 0-4
                break
            default:
                output = Math.random() > 0.5 ? 1 : 0 // Binary classification
        }

        // Create the prediction
        const prediction = await Prediction.create({
            model: modelId,
            input: data,
            output,
            confidence,
            metadata: {
                modelType: model.type,
                predictionTime: new Date(),
            },
        })

        res.status(201).json({
            success: true,
            data: prediction,
        })
    } catch (error) {
        logger.error("Error creating prediction", error)
        next(error)
    }
}

/**
 * @desc    Delete a prediction
 * @route   DELETE /api/predictions/:id
 * @access  Public
 */
export const deletePrediction = async (req, res, next) => {
    try {
        const prediction = await Prediction.findById(req.params.id)

        if (!prediction) {
            res.status(404)
            throw new Error("Prediction not found")
        }

        await prediction.deleteOne()

        res.status(200).json({
            success: true,
            message: "Prediction deleted successfully",
        })
    } catch (error) {
        logger.error(`Error deleting prediction ${req.params.id}`, error)
        next(error)
    }
}
