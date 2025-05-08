import express from "express"
import {
    getAllModels,
    getModelById,
    createModel,
    trainModel,
    deleteModel,
} from "../controllers/modelController.js"

const router = express.Router()

/**
 * @route   GET /api/models
 * @desc    Get all models
 * @access  Public
 */
router.get("/", getAllModels)

/**
 * @route   POST /api/models/create
 * @desc    Create a new model
 * @access  Public
 */
router.post("/create", createModel)

/**
 * @route   GET /api/models/:id
 * @desc    Get model by ID
 * @access  Public
 */
router.get("/:id", getModelById)

/**
 * @route   PUT /api/models/:id/train
 * @desc    Train a model
 * @access  Public
 */
router.put("/:id/train", trainModel)

/**
 * @route   DELETE /api/models/:id
 * @desc    Delete a model
 * @access  Public
 */
router.delete("/:id", deleteModel)

export default router
