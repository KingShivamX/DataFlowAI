import mongoose from "mongoose"

const DatasetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a dataset name"],
        trim: true,
        maxlength: [50, "Name cannot be more than 50 characters"],
    },
    description: {
        type: String,
        required: false,
        maxlength: [500, "Description cannot be more than 500 characters"],
    },
    filename: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true,
    },
    columns: [
        {
            name: String,
            type: {
                type: String,
                enum: ["numeric", "categorical", "datetime", "text", "boolean"],
            },
            stats: {
                min: Number,
                max: Number,
                mean: Number,
                median: Number,
                mode: String,
                uniqueValues: Number,
                nullValues: Number,
            },
        },
    ],
    rowCount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

// Pre-save hook to update the updatedAt field
DatasetSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    next()
})

export default mongoose.model("Dataset", DatasetSchema)
