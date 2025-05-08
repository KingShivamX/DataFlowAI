import mongoose from "mongoose"

const PredictionSchema = new mongoose.Schema({
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Model",
        required: [true, "Model is required"],
    },
    input: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Input data is required"],
    },
    output: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Output result is required"],
    },
    confidence: {
        type: Number,
        min: 0,
        max: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
})

export default mongoose.model("Prediction", PredictionSchema)
