import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"
import { useNavigate } from "react-router-dom"
import { useTutorial } from "../contexts/TutorialContext"

const LinearRegression = () => {
    const chartRef = useRef(null)
    const chartInstance = useRef(null)
    const navigate = useNavigate()
    const { startTutorial } = useTutorial()

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
                                    const point = context.raw;
                                    const datasetLabel = context.dataset.label;
                                    
                                    if (point.isError) {
                                        return `Error: ${point.error.toFixed(4)}`;
                                    }
                                    
                                    if (datasetLabel === "Data Points") {
                                        return [
                                            `Coordinates: (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`,
                                            slope !== 0 ? `Predicted value: ${(slope * point.x + intercept).toFixed(4)}` : '',
                                            slope !== 0 ? `Error: ${Math.abs(point.y - (slope * point.x + intercept)).toFixed(4)}` : ''
                                        ].filter(Boolean);
                                    }
                                    
                                    if (datasetLabel === "Regression Line") {
                                        return `y = ${slope.toFixed(3)}x + ${intercept.toFixed(3)} (at x=${point.x.toFixed(2)})`;
                                    }
                                    
                                    return `(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`;
                                },
                                title: function(context) {
                                    const datasetLabel = context[0].dataset.label;
                                    if (datasetLabel === "Data Points") {
                                        return "Data Point Info";
                                    } else if (datasetLabel === "Regression Line") {
                                        return "Regression Line";
                                    } else if (datasetLabel === "Error Lines") {
                                        return "Error Measurement";
                                    }
                                    return datasetLabel;
                                }
                            }
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

    // Create a tooltip component
    const Tooltip = ({ text, children }) => {
        const [isVisible, setIsVisible] = useState(false);
        
        return (
            <div className="relative inline-block">
                <div
                    onMouseEnter={() => setIsVisible(true)}
                    onMouseLeave={() => setIsVisible(false)}
                >
                    {children}
                </div>
                {isVisible && (
                    <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-800 rounded shadow-lg">
                        {text}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-4 min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center gap-1"
                            title="Return to home page"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                        </button>
                        <h2 className="text-2xl font-bold">Linear Regression</h2>
                    </div>
                    <button
                        onClick={startTutorial}
                        className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                    >
                        Show Tutorial
                    </button>
                </div>

                <div className="mb-8">
                    <canvas 
                        ref={chartRef}
                        onClick={handleCanvasClick}
                        className="canvas w-full h-[500px]"
                    ></canvas>
                </div>

                {/* Control buttons */}
                <div className="controls mb-4 flex gap-4 flex-wrap">
                    <button
                        onClick={() => {
                            if (showErrorLines) setShowErrorLines(false)
                            trainModel()
                        }}
                        disabled={points.length < 2 || isTraining}
                        className="train-button px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        data-tutorial="train-model"
                    >
                        Train Model
                    </button>

                    <button
                        onClick={generateRandomPoints}
                        disabled={isTraining}
                        className="random-points-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        data-tutorial="random-points"
                    >
                        Generate Random Points
                    </button>

                    <button
                        onClick={clearPoints}
                        className="clear-button px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        data-tutorial="clear-points"
                    >
                        Clear Points
                    </button>

                    <Tooltip text="Errors show the vertical distance between each data point and the regression line. These distances represent the difference between actual values and predicted values, helping visualize how well the model fits the data.">
                        <button
                            onClick={() => setShowErrorLines(!showErrorLines)}
                            disabled={slope === 0}
                            className={`show-errors-button px-4 py-2 ${
                                showErrorLines ? "bg-red-500" : "bg-blue-500"
                            } text-white rounded hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed`}
                            data-tutorial="show-errors"
                        >
                            {showErrorLines ? "Hide Errors" : "Show Errors"}
                        </button>
                    </Tooltip>
                </div>
                
                {/* Error lines explanation */}
                {showErrorLines && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-8 bg-red-300 relative">
                                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute left-0 bottom-0 w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                            </div>
                            <p className="text-sm text-red-700">
                                <strong>Error lines:</strong> The vertical red lines show the distance between each data point (blue) and the predicted value on the regression line (red). 
                                Smaller lines indicate better predictions. Hover over the lines to see the exact error value.
                            </p>
                        </div>
                    </div>
                )}
                
                {/* Stats display */}
                <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">Graph Information</h3>
                    <div className="flex flex-wrap gap-5">
                        <div className="bg-white px-4 py-2 rounded-md shadow-sm border-l-4 border-blue-500">
                            <Tooltip text="The number of data points affects the reliability of your regression model. More points generally lead to more reliable models. You need at least 2 points to train a linear regression model.">
                                <div className="cursor-help">
                                    <span className="text-gray-500 text-sm">Number of points:</span>
                                    <p className="text-xl font-semibold">{points.length}</p>
                                </div>
                            </Tooltip>
                        </div>
                        
                        {points.length > 0 && slope !== 0 && (
                            <div className="bg-white px-4 py-2 rounded-md shadow-sm border-l-4 border-green-500">
                                <Tooltip text="In the equation y = mx + b, 'm' is the slope (how steep the line is) and 'b' is the y-intercept (where the line crosses the y-axis). A positive slope means the line goes up from left to right, while a negative slope means it goes down.">
                                    <div className="cursor-help">
                                        <span className="text-gray-500 text-sm">Equation:</span>
                                        <p className="text-xl font-semibold">
                                            y = {slope.toFixed(3)}x + {intercept.toFixed(3)}
                                        </p>
                                    </div>
                                </Tooltip>
                            </div>
                        )}
                        
                        {points.length > 0 && slope !== 0 && (
                            <div className="bg-white px-4 py-2 rounded-md shadow-sm border-l-4 border-purple-500">
                                <Tooltip text="The correlation coefficient measures the strength and direction of the linear relationship between two variables. Values close to 1 or -1 indicate strong correlation, while values near 0 indicate weak correlation.">
                                    <div className="cursor-help">
                                        <span className="text-gray-500 text-sm">Fit Quality:</span>
                                        <p className="text-xl font-semibold">
                                            {metrics.r2 > 0.8 ? "Excellent" : metrics.r2 > 0.6 ? "Good" : metrics.r2 > 0.4 ? "Fair" : "Poor"}
                                        </p>
                                    </div>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                </div>

                {/* Metrics Section */}
                <div className="metrics mt-6 bg-white/80 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Model Metrics</h3>
                    <div className="text-sm">
                        {points.length > 0 && slope !== 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white p-3 rounded border">
                                        <Tooltip text="R² (coefficient of determination) measures the proportion of variance in the dependent variable that is predictable from the independent variable. It ranges from -∞ to 1, where 1 indicates a perfect fit, 0 indicates the model is no better than predicting the mean, and negative values indicate the model performs worse than using the mean.">
                                            <p className="font-medium mb-2 cursor-help border-b border-dotted border-gray-300 inline-block">
                                                R² Score:
                                            </p>
                                        </Tooltip>
                                        <p className="text-lg mb-1">
                                            {metrics.r2.toFixed(4)}
                                        </p>
                                        <div className="text-sm text-gray-600">
                                            Measures how well the model fits the
                                            data:
                                            <ul className="list-disc pl-4 mt-1 space-y-1">
                                                <li>1.0 = Perfect fit</li>
                                                <li>0.0 = Poor fit</li>
                                                <li>
                                                    Negative = Worse than
                                                    horizontal line
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-white p-3 rounded border">
                                        <Tooltip text="Mean Squared Error (MSE) calculates the average of the squared differences between predicted and actual values. It gives higher weight to larger errors due to the squaring operation. This makes it particularly sensitive to outliers, but useful for penalizing large prediction errors.">
                                            <p className="font-medium mb-2 cursor-help border-b border-dotted border-gray-300 inline-block">
                                                Mean Squared Error (MSE):
                                            </p>
                                        </Tooltip>
                                        <p className="text-lg mb-1">
                                            {metrics.mse.toFixed(4)}
                                        </p>
                                        <div className="text-sm text-gray-600">
                                            Average of squared differences
                                            between predictions and actual
                                            values:
                                            <ul className="list-disc pl-4 mt-1 space-y-1">
                                                <li>
                                                    Penalizes larger errors more
                                                </li>
                                                <li>Always positive</li>
                                                <li>Lower is better</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-white p-3 rounded border">
                                        <Tooltip text="Mean Absolute Error (MAE) measures the average magnitude of errors in a set of predictions, without considering their direction. It's the average over the test sample of the absolute differences between prediction and actual observation. Unlike MSE, it uses the same scale as the data and is less affected by outliers.">
                                            <p className="font-medium mb-2 cursor-help border-b border-dotted border-gray-300 inline-block">
                                                Mean Absolute Error (MAE):
                                            </p>
                                        </Tooltip>
                                        <p className="text-lg mb-1">
                                            {metrics.mae.toFixed(4)}
                                        </p>
                                        <div className="text-sm text-gray-600">
                                            Average of absolute differences
                                            between predictions and actual
                                            values:
                                            <ul className="list-disc pl-4 mt-1 space-y-1">
                                                <li>Easier to interpret</li>
                                                <li>
                                                    Less sensitive to outliers
                                                    than MSE
                                                </li>
                                                <li>Lower is better</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 text-sm text-gray-600">
                                    <p className="font-medium mb-2">
                                        Understanding the Metrics:
                                    </p>
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li>
                                            <span className="font-medium">
                                                R² (R-squared):
                                            </span>{" "}
                                            Shows how much of the data&apos;s
                                            variance is explained by the model.
                                            A value of 0.8 means 80% of the
                                            variance in y is predictable from x.
                                        </li>
                                        <li>
                                            <span className="font-medium">
                                                MSE:
                                            </span>{" "}
                                            Calculated by squaring the
                                            differences between predicted and
                                            actual values. Useful for training
                                            but harder to interpret due to
                                            squared units.
                                        </li>
                                        <li>
                                            <span className="font-medium">
                                                MAE:
                                            </span>{" "}
                                            Average distance between predicted
                                            and actual values. If MAE is 0.1,
                                            predictions are off by 0.1 units on
                                            average.
                                        </li>
                                        <li className="text-gray-500 italic">
                                            Note: For this visualization, all
                                            values are scaled between 0 and 1,
                                            so the errors (MSE and MAE) will
                                            also be between 0 and 1.
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Bottom back button */}
            <div className="flex justify-center mt-6 mb-8">
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </button>
            </div>
        </div>
    )
}

export default LinearRegression
