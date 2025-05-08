import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"
import { useNavigate } from "react-router-dom"
import AlgorithmLayout from "./AlgorithmLayout"
import { motion } from "framer-motion"
import LinearRegressionTheory from "../components/theory/LinearRegressionTheory"

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
                            pointRadius: 8,
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
            <div className="px-2 sm:px-4">
                <div className="mb-5">
                    <p className="text-gray-700 mb-3">
                        Linear regression finds the best-fitting straight line
                        through a set of points. Click on the graph to add data
                        points, then train the model to see the resulting line.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4">
                        <button
                            onClick={trainModel}
                            disabled={points.length < 2 || isTraining}
                            className={`px-4 py-2 rounded-lg ${
                                points.length < 2 || isTraining
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                        >
                            {isTraining ? "Training..." : "Train Model"}
                        </button>
                        <button
                            onClick={generateRandomPoints}
                            disabled={isTraining}
                            className={`px-4 py-2 rounded-lg ${
                                isTraining
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-amber-400 text-amber-900 hover:bg-amber-500"
                            }`}
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
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            }`}
                        >
                            {showErrorLines
                                ? "Hide Error Lines"
                                : "Show Error Lines"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <div className="lg:col-span-3 bg-white/95 rounded-xl shadow-md border border-amber-200 overflow-hidden">
                        <div
                            className="w-full h-[520px] relative"
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

                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-md border-2 border-amber-300 p-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-200/50 rounded-bl-full"></div>
                            <h3 className="text-lg font-bold mb-3 text-amber-800 border-b-2 border-amber-200 pb-1 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 text-amber-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Instructions
                            </h3>
                            <ol className="list-decimal pl-5 text-sm text-amber-900 space-y-1 relative z-10">
                                <li>Click on the graph to add data points</li>
                                <li>Click 'Train Model' to fit a line</li>
                                <li>
                                    Use 'Show Error Lines' to see prediction
                                    errors
                                </li>
                                <li>
                                    'Generate Random Points' creates sample data
                                </li>
                            </ol>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md border-2 border-green-200 p-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-green-200/50 rounded-bl-full"></div>
                            <h3 className="text-lg font-bold mb-3 text-green-800 border-b-2 border-green-200 pb-1 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 text-green-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599.8a1 1 0 01-.4 1.8l-3.951 1.58A1 1 0 0112 10.5V12h5a1 1 0 110 2H5a1 1 0 110-2h5v-1.5a1 1 0 01.202-.5l-3.951-1.58a1 1 0 11.4-1.8l3.951 1.58a1 1 0 01.398.8V3a1 1 0 011-1zm0 6.323l-3.5-1.4v4.154l3.5-1.4v-1.354zm7-5.323a1 1 0 011 1v8a1 1 0 11-2 0V4a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Model Parameters
                            </h3>
                            <div className="space-y-2 relative z-10">
                                <p className="text-green-900 bg-green-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                    <span className="font-medium">Slope:</span>
                                    <span className="font-bold bg-green-200 px-2 py-0.5 rounded-md">
                                        {slope.toFixed(4)}
                                    </span>
                                </p>
                                <p className="text-green-900 bg-green-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                    <span className="font-medium">
                                        Intercept:
                                    </span>
                                    <span className="font-bold bg-green-200 px-2 py-0.5 rounded-md">
                                        {intercept.toFixed(4)}
                                    </span>
                                </p>
                                <div className="bg-white/60 rounded-md p-2 mt-2 border border-green-200">
                                    <p className="text-green-800 font-medium text-center">
                                        y ={" "}
                                        <span className="font-bold">
                                            {slope.toFixed(2)}
                                        </span>
                                        x +{" "}
                                        <span className="font-bold">
                                            {intercept.toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md border-2 border-blue-200 p-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200/50 rounded-bl-full"></div>
                            <h3 className="text-lg font-bold mb-3 text-blue-800 border-b-2 border-blue-200 pb-1 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 text-blue-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                </svg>
                                Performance Metrics
                            </h3>
                            <div className="space-y-2 relative z-10">
                                <p
                                    className="text-blue-900 bg-blue-100/80 rounded-md px-3 py-1 flex justify-between items-center"
                                    title="R-squared measures how well the model fits the data (0 to 1, higher is better)"
                                >
                                    <span className="font-medium">R²:</span>
                                    <span className="font-bold bg-blue-200 px-2 py-0.5 rounded-md">
                                        {metrics.r2.toFixed(4)}
                                    </span>
                                </p>
                                <p
                                    className="text-blue-900 bg-blue-100/80 rounded-md px-3 py-1 flex justify-between items-center"
                                    title="Mean Squared Error - average of squared differences between predictions and actual values"
                                >
                                    <span className="font-medium">MSE:</span>
                                    <span className="font-bold bg-blue-200 px-2 py-0.5 rounded-md">
                                        {metrics.mse.toFixed(4)}
                                    </span>
                                </p>
                                <p
                                    className="text-blue-900 bg-blue-100/80 rounded-md px-3 py-1 flex justify-between items-center"
                                    title="Mean Absolute Error - average of absolute differences between predictions and actual values"
                                >
                                    <span className="font-medium">MAE:</span>
                                    <span className="font-bold bg-blue-200 px-2 py-0.5 rounded-md">
                                        {metrics.mae.toFixed(4)}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <LinearRegressionTheory />
            </div>
        </AlgorithmLayout>
    )
}

export default LinearRegression
