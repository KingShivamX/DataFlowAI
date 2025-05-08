import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"
import { useNavigate } from "react-router-dom"
import AlgorithmLayout from "./AlgorithmLayout"
import { motion } from "framer-motion"

const LinearRegression = () => {
    const chartRef = useRef(null)
    const chartInstance = useRef(null)
    const navigate = useNavigate()

    const [points, setPoints] = useState([])
    const [slope, setSlope] = useState(0)
    const [intercept, setIntercept] = useState(0)
    const [isTraining, setIsTraining] = useState(false)
    const [metrics, setMetrics] = useState({
        r2: 0,
        mse: 0,
        mae: 0,
    })
    const [showErrorLines, setShowErrorLines] = useState(false)
    const [isGeneratedPoints, setIsGeneratedPoints] = useState(false)

    // Initialize chart
    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }

            const ctx = chartRef.current.getContext("2d")
            chartInstance.current = new Chart(ctx, {
                type: "scatter",
                data: {
                    datasets: [
                        {
                            label: "Data Points",
                            data: points,
                            pointRadius: 5,
                            backgroundColor: "rgba(54, 162, 235, 1)",
                            animation: isGeneratedPoints,
                            animationDuration: isGeneratedPoints ? 800 : 0,
                        },
                        {
                            label: "Regression Line",
                            data: generateLinePoints(),
                            type: "line",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 2,
                            fill: false,
                            animation: {
                                duration: isTraining ? 800 : 0,
                                easing: "easeInOutQuart",
                            },
                        },
                        ...(showErrorLines && slope !== 0
                            ? [
                                  {
                                      label: "Error Lines",
                                      data: generateErrorLines(),
                                      type: "line",
                                      borderColor: "rgba(255, 99, 132, 0.5)",
                                      borderWidth: 1,
                                      pointRadius: 3,
                                      //   animation: true,
                                  },
                              ]
                            : []),
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animations: {
                        tension: {
                            duration: isTraining ? 800 : 0,
                            easing: "easeInOutQuart",
                        },
                    },
                    scales: {
                        x: {
                            min: 0,
                            max: 1,
                            title: {
                                display: true,
                                text: "X",
                            },
                        },
                        y: {
                            min: 0,
                            max: 1,
                            title: {
                                display: true,
                                text: "Y",
                            },
                        },
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const point = context.raw
                                    if (point.isError) {
                                        return `Error: ${point.error.toFixed(
                                            4
                                        )}`
                                    }
                                    return `(${point.x.toFixed(
                                        2
                                    )}, ${point.y.toFixed(2)})`
                                },
                            },
                        },
                    },
                },
            })
        }
    }, [points, slope, intercept, showErrorLines, isGeneratedPoints])

    // Modify point addition to set isGeneratedPoints to false
    const handleCanvasClick = (event) => {
        if (!isTraining && chartRef.current) {
            setIsGeneratedPoints(false)
            const canvas = chartRef.current
            const rect = canvas.getBoundingClientRect()

            // Get the scaling factor of the canvas
            const scaleX = canvas.width / rect.width
            const scaleY = canvas.height / rect.height

            // Calculate the position considering the scale
            const x = ((event.clientX - rect.left) * scaleX) / canvas.width
            const y = 1 - ((event.clientY - rect.top) * scaleY) / canvas.height

            const xValue = Math.max(0, Math.min(1, x))
            const yValue = Math.max(0, Math.min(1, y))

            setPoints([...points, { x: xValue, y: yValue }])
        }
    }

    // Modify line generation to respect 0-1 bounds
    const generateLinePoints = () => {
        if (points.length < 2) return []
        return [
            { x: 0, y: intercept },
            { x: 1, y: slope + intercept },
        ]
    }

    // Train the model
    const trainModel = async () => {
        setIsTraining(true)

        // Calculate means
        const xMean = points.reduce((sum, p) => sum + p.x, 0) / points.length
        const yMean = points.reduce((sum, p) => sum + p.y, 0) / points.length

        // Calculate slope and intercept
        const numerator = points.reduce(
            (sum, p) => sum + (p.x - xMean) * (p.y - yMean),
            0
        )
        const denominator = points.reduce(
            (sum, p) => sum + Math.pow(p.x - xMean, 2),
            0
        )

        const newSlope = numerator / denominator
        const newIntercept = yMean - newSlope * xMean

        // Calculate metrics
        const predictions = points.map((p) => newSlope * p.x + newIntercept)

        // Calculate R-squared
        const ssTotal = points.reduce(
            (sum, p) => sum + Math.pow(p.y - yMean, 2),
            0
        )
        const ssResidual = points.reduce(
            (sum, p, i) => sum + Math.pow(p.y - predictions[i], 2),
            0
        )
        const r2 = 1 - ssResidual / ssTotal

        // Calculate MSE (Mean Squared Error)
        const mse = ssResidual / points.length

        // Calculate MAE (Mean Absolute Error)
        const mae =
            points.reduce(
                (sum, p, i) => sum + Math.abs(p.y - predictions[i]),
                0
            ) / points.length

        setMetrics({ r2, mse, mae })
        setSlope(newSlope)
        setIntercept(newIntercept)

        setTimeout(() => {
            setIsTraining(false)
        }, 800)
    }

    // Modify generateRandomPoints to set isGeneratedPoints to true
    const generateRandomPoints = () => {
        setIsGeneratedPoints(true)
        const numPoints = 10 // You can make this adjustable if needed
        const newPoints = []

        // Generate points with some correlation for better visualization
        for (let i = 0; i < numPoints; i++) {
            const x = Math.random()
            // Add some noise to make it interesting
            const y = 0.7 * x + 0.15 + (Math.random() - 0.5) * 0.2
            newPoints.push({ x, y: Math.max(0, Math.min(1, y)) })
        }

        setPoints(newPoints)
        // Reset regression line
        setSlope(0)
        setIntercept(0)
    }

    // Modify clearPoints to reset isGeneratedPoints
    const clearPoints = () => {
        setPoints([])
        setSlope(0)
        setIntercept(0)
        setIsGeneratedPoints(false)
    }

    // Generate error lines for visualization
    const generateErrorLines = () => {
        const errorLines = []
        points.forEach((point) => {
            const predicted = slope * point.x + intercept
            errorLines.push(
                {
                    x: point.x,
                    y: point.y,
                    isError: true,
                    error: Math.abs(predicted - point.y),
                },
                {
                    x: point.x,
                    y: predicted,
                    isError: true,
                    error: Math.abs(predicted - point.y),
                },
                { x: null, y: null } // Creates a break in the line
            )
        })
        return errorLines
    }

    return (
        <AlgorithmLayout title="Linear Regression">
            <motion.div
                className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-6">
                    <p className="text-gray-700 mb-4">
                        Linear regression finds the best-fitting straight line
                        through a set of points. Click on the graph to add data
                        points, then train the model to see the resulting line.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6">
                        <button
                            onClick={trainModel}
                            disabled={points.length < 2 || isTraining}
                            className={`px-4 py-2 rounded-lg ${
                                points.length < 2 || isTraining
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:shadow-md"
                            }`}
                        >
                            {isTraining ? "Training..." : "Train Model"}
                        </button>
                        <button
                            onClick={generateRandomPoints}
                            disabled={isTraining}
                            className="px-4 py-2 bg-white/50 text-gray-700 rounded-lg hover:bg-white/70"
                        >
                            Generate Random Points
                        </button>
                        <button
                            onClick={clearPoints}
                            disabled={isTraining || points.length === 0}
                            className={`px-4 py-2 rounded-lg ${
                                isTraining || points.length === 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-red-500/80 text-white hover:bg-red-500/90"
                            }`}
                        >
                            Clear Points
                        </button>
                        <button
                            onClick={() => setShowErrorLines(!showErrorLines)}
                            disabled={slope === 0}
                            className={`px-4 py-2 rounded-lg ${
                                slope === 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : showErrorLines
                                    ? "bg-amber-500/80 text-white hover:bg-amber-500/90"
                                    : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            }`}
                        >
                            {showErrorLines
                                ? "Hide Error Lines"
                                : "Show Error Lines"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/70 rounded-xl shadow-sm p-4">
                        <div
                            className="w-full h-[500px]"
                            onClick={handleCanvasClick}
                            style={{
                                cursor: isTraining ? "default" : "crosshair",
                            }}
                        >
                            <canvas
                                ref={chartRef}
                                className="w-full h-full"
                            ></canvas>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="bg-white/70 rounded-xl shadow-sm p-4">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                Model Parameters
                            </h3>
                            <div className="space-y-2">
                                <p className="text-gray-700">
                                    <span className="font-medium">Slope:</span>{" "}
                                    {slope.toFixed(4)}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">
                                        Intercept:
                                    </span>{" "}
                                    {intercept.toFixed(4)}
                                </p>
                                <p className="text-gray-700 font-medium mt-2">
                                    Equation: y = {slope.toFixed(2)}x +{" "}
                                    {intercept.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/70 rounded-xl shadow-sm p-4">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                Performance Metrics
                            </h3>
                            <div className="space-y-2">
                                <p
                                    className="text-gray-700"
                                    title="R-squared measures how well the model fits the data (0 to 1, higher is better)"
                                >
                                    <span className="font-medium">R²:</span>{" "}
                                    {metrics.r2.toFixed(4)}
                                </p>
                                <p
                                    className="text-gray-700"
                                    title="Mean Squared Error - average of squared differences between predictions and actual values"
                                >
                                    <span className="font-medium">MSE:</span>{" "}
                                    {metrics.mse.toFixed(4)}
                                </p>
                                <p
                                    className="text-gray-700"
                                    title="Mean Absolute Error - average of absolute differences between predictions and actual values"
                                >
                                    <span className="font-medium">MAE:</span>{" "}
                                    {metrics.mae.toFixed(4)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/70 rounded-xl shadow-sm p-4">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                Instructions
                            </h3>
                            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                                <li>Click on the graph to add data points</li>
                                <li>Click 'Train Model' to fit a line</li>
                                <li>
                                    Check 'Show Error Lines' to see prediction
                                    errors
                                </li>
                                <li>
                                    'Generate Random Points' creates sample data
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AlgorithmLayout>
    )
}

export default LinearRegression
