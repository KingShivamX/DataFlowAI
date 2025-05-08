import express from "express"
import {
    getAllDatasets,
    getDatasetById,
    uploadDataset,
    deleteDataset,
} from "../controllers/dataController.js"

const router = express.Router()

/**
 * @route   GET /api/data
 * @desc    Get all datasets
 * @access  Public
 */
router.get("/", getAllDatasets)

/**
 * @route   POST /api/data/upload
 * @desc    Upload a new dataset
 * @access  Public
 */
router.post("/upload", uploadDataset)

/**
 * @route   GET /api/data/:id
 * @desc    Get dataset by ID
 * @access  Public
 */
router.get("/:id", getDatasetById)

/**
 * @route   DELETE /api/data/:id
 * @desc    Delete a dataset
 * @access  Public
 */
router.delete("/:id", deleteDataset)

export default router
