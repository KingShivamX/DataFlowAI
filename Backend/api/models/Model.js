import mongoose from "mongoose"

const ModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a model name"],
        trim: true,
        maxlength: [50, "Name cannot be more than 50 characters"],
    },
    description: {
        type: String,
        required: false,
        maxlength: [500, "Description cannot be more than 500 characters"],
    },
    type: {
        type: String,
        required: [true, "Please specify model type"],
        enum: [
            "linearRegression",
            "logisticRegression",
            "knn",
            "kmeans",
            "decisionTree",
            "randomForest",
            "svm",
            "neuralNetwork",
        ],
    },
    dataset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dataset",
        required: [true, "Dataset is required"],
    },
    parameters: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    metrics: {
        accuracy: Number,
        precision: Number,
        recall: Number,
        f1Score: Number,
        mae: Number,
        mse: Number,
        rmse: Number,
        r2: Number,
    },
    status: {
        type: String,
        enum: ["created", "training", "trained", "failed"],
        default: "created",
    },
    modelPath: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    trainedAt: {
        type: Date,
    },
})

// Pre-save hook to update the updatedAt field
ModelSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    next()
})

export default mongoose.model("Model", ModelSchema)
