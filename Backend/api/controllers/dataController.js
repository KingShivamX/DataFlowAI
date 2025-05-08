import Dataset from "../models/Dataset.js"
import logger from "../utils/logger.js"

/**
 * @desc    Get all datasets
 * @route   GET /api/data
 * @access  Public
 */
export const getAllDatasets = async (req, res, next) => {
    try {
        const datasets = await Dataset.find({}).select(
            "name description createdAt rowCount"
        )

        res.status(200).json({
            success: true,
            count: datasets.length,
            data: datasets,
        })
    } catch (error) {
        logger.error("Error fetching datasets", error)
        next(error)
    }
}

/**
 * @desc    Get a single dataset by ID
 * @route   GET /api/data/:id
 * @access  Public
 */
export const getDatasetById = async (req, res, next) => {
    try {
        const dataset = await Dataset.findById(req.params.id)

        if (!dataset) {
            res.status(404)
            throw new Error("Dataset not found")
        }

        res.status(200).json({
            success: true,
            data: dataset,
        })
    } catch (error) {
        logger.error(`Error fetching dataset ${req.params.id}`, error)
        next(error)
    }
}

/**
 * @desc    Upload a new dataset
 * @route   POST /api/data/upload
 * @access  Public
 */
export const uploadDataset = async (req, res, next) => {
    try {
        // In a real implementation, this would handle file upload
        // and process the dataset to extract column information

        // For now, we'll create a mock dataset
        const mockDataset = {
            name: req.body.name || "Sample Dataset",
            description: req.body.description || "Sample description",
            filename: "sample.csv",
            filePath: "/uploads/sample.csv",
            fileSize: 1024,
            columns: [
                {
                    name: "feature1",
                    type: "numeric",
                    stats: {
                        min: 0,
                        max: 100,
                        mean: 50,
                        median: 45,
                        uniqueValues: 100,
                        nullValues: 0,
                    },
                },
                {
                    name: "feature2",
                    type: "categorical",
                    stats: {
                        uniqueValues: 3,
                        nullValues: 0,
                    },
                },
            ],
            rowCount: 100,
        }

        const dataset = await Dataset.create(mockDataset)

        res.status(201).json({
            success: true,
            data: dataset,
        })
    } catch (error) {
        logger.error("Error uploading dataset", error)
        next(error)
    }
}

/**
 * @desc    Delete a dataset
 * @route   DELETE /api/data/:id
 * @access  Public
 */
export const deleteDataset = async (req, res, next) => {
    try {
        const dataset = await Dataset.findById(req.params.id)

        if (!dataset) {
            res.status(404)
            throw new Error("Dataset not found")
        }

        await dataset.deleteOne()

        res.status(200).json({
            success: true,
            message: "Dataset deleted successfully",
        })
    } catch (error) {
        logger.error(`Error deleting dataset ${req.params.id}`, error)
        next(error)
    }
}
