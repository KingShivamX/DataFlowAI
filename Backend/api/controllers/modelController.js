import Model from "../models/Model.js"
import Dataset from "../models/Dataset.js"
import logger from "../utils/logger.js"

/**
 * @desc    Get all models
 * @route   GET /api/models
 * @access  Public
 */
export const getAllModels = async (req, res, next) => {
    try {
        const models = await Model.find({})
            .select("name type status createdAt dataset")
            .populate("dataset", "name")

        res.status(200).json({
            success: true,
            count: models.length,
            data: models,
        })
    } catch (error) {
        logger.error("Error fetching models", error)
        next(error)
    }
}

/**
 * @desc    Get a single model by ID
 * @route   GET /api/models/:id
 * @access  Public
 */
export const getModelById = async (req, res, next) => {
    try {
        const model = await Model.findById(req.params.id).populate(
            "dataset",
            "name filename"
        )

        if (!model) {
            res.status(404)
            throw new Error("Model not found")
        }

        res.status(200).json({
            success: true,
            data: model,
        })
    } catch (error) {
        logger.error(`Error fetching model ${req.params.id}`, error)
        next(error)
    }
}

/**
 * @desc    Create a new model
 * @route   POST /api/models/create
 * @access  Public
 */
export const createModel = async (req, res, next) => {
    try {
        const { name, type, datasetId, parameters } = req.body

        // Validate required fields
        if (!name || !type || !datasetId) {
            res.status(400)
            throw new Error("Please provide name, type, and datasetId")
        }

        // Check if dataset exists
        const dataset = await Dataset.findById(datasetId)
        if (!dataset) {
            res.status(404)
            throw new Error("Dataset not found")
        }

        // Create the model
        const model = await Model.create({
            name,
            type,
            dataset: datasetId,
            parameters: parameters || {},
            status: "created",
        })

        res.status(201).json({
            success: true,
            data: model,
        })
    } catch (error) {
        logger.error("Error creating model", error)
        next(error)
    }
}

/**
 * @desc    Train a model
 * @route   PUT /api/models/:id/train
 * @access  Public
 */
export const trainModel = async (req, res, next) => {
    try {
        const model = await Model.findById(req.params.id)

        if (!model) {
            res.status(404)
            throw new Error("Model not found")
        }

        // Update model status to training
        model.status = "training"
        await model.save()

        // In a real implementation, this would start a training job
        // For now, we'll simulate training with a timeout and mock metrics
        setTimeout(async () => {
            try {
                model.status = "trained"
                model.trainedAt = Date.now()
                model.metrics = {
                    accuracy: Math.random() * 0.3 + 0.7, // Random accuracy between 0.7 and 1.0
                    precision: Math.random() * 0.3 + 0.7,
                    recall: Math.random() * 0.3 + 0.7,
                    f1Score: Math.random() * 0.3 + 0.7,
                    mse: Math.random() * 0.2,
                    rmse: Math.random() * 0.4,
                    r2: Math.random() * 0.3 + 0.7,
                }

                await model.save()
                logger.info(`Model ${model._id} training completed`)
            } catch (err) {
                logger.error(
                    `Error updating model ${model._id} after training`,
                    err
                )
            }
        }, 5000) // Simulate 5 seconds of training time

        res.status(200).json({
            success: true,
            message: "Model training started",
            data: {
                id: model._id,
                status: model.status,
            },
        })
    } catch (error) {
        logger.error(`Error training model ${req.params.id}`, error)
        next(error)
    }
}

/**
 * @desc    Delete a model
 * @route   DELETE /api/models/:id
 * @access  Public
 */
export const deleteModel = async (req, res, next) => {
    try {
        const model = await Model.findById(req.params.id)

        if (!model) {
            res.status(404)
            throw new Error("Model not found")
        }

        await model.deleteOne()

        res.status(200).json({
            success: true,
            message: "Model deleted successfully",
        })
    } catch (error) {
        logger.error(`Error deleting model ${req.params.id}`, error)
        next(error)
    }
}
