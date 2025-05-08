import React, { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"
import { useNavigate } from "react-router-dom"
import AlgorithmLayout from "./AlgorithmLayout"
import { motion } from "framer-motion"
import LogisticRegressionTheory from "../components/theory/LogisticRegressionTheory"

const LogisticRegression = () => {
    const chartRef = useRef(null)
    const chartInstance = useRef(null)
    const navigate = useNavigate()

    const [points, setPoints] = useState([])
    const [currentClass, setCurrentClass] = useState(0) // 0 or 1
    const [weights, setWeights] = useState({ w1: 0, w2: 0, b: 0 })
    const [isTraining, setIsTraining] = useState(false)
    const [showDecisionBoundary, setShowDecisionBoundary] = useState(false)
    const [metrics, setMetrics] = useState({
        accuracy: 0,
        precision: 0,
        recall: 0,
        f1: 0,
        threshold: 0.5,
    })
    const [shouldAnimateDecisionBoundary, setShouldAnimateDecisionBoundary] =
        useState(false)

    // Sigmoid function
    const sigmoid = (z) => 1 / (1 + Math.exp(-z))

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
                            label: "Class 0",
                            data: points.filter((p) => p.class === 0),
                            backgroundColor: "rgba(54, 162, 235, 0.7)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                            pointRadius: 8,
                            animation: false,
                        },
                        {
                            label: "Class 1",
                            data: points.filter((p) => p.class === 1),
                            backgroundColor: "rgba(255, 99, 132, 0.7)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                            pointRadius: 8,
                            animation: false,
                        },
                        ...(showDecisionBoundary && weights.w1 !== 0
                            ? [
                                  {
                                      label: "Decision Boundary",
                                      data: generateDecisionBoundary(),
                                      type: "line",
                                      borderColor: "rgba(75, 192, 192, 1)",
                                      borderWidth: 2,
                                      fill: false,
                                      tension: 0.4,
                                      pointRadius: 0,
                                      animation: shouldAnimateDecisionBoundary
                                          ? {
                                                duration: 800,
                                                easing: "easeInOutQuart",
                                            }
                                          : false,
                                  },
                              ]
                            : []),
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            min: 0,
                            max: 1,
                            title: {
                                display: true,
                                text: "X₁",
                            },
                        },
                        y: {
                            min: 0,
                            max: 1,
                            title: {
                                display: true,
                                text: "X₂",
                            },
                        },
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const point = context.raw
                                    if (!point.x) return ""
                                    const z =
                                        weights.w1 * point.x +
                                        weights.w2 * point.y +
                                        weights.b
                                    const prob = sigmoid(z)
                                    return `(${point.x.toFixed(
                                        2
                                    )}, ${point.y.toFixed(
                                        2
                                    )}) - P(class=1) = ${prob.toFixed(3)}`
                                },
                            },
                        },
                    },
                },
            })
        }
    }, [points, weights, showDecisionBoundary, shouldAnimateDecisionBoundary])

    // Handle canvas click for adding points
    const handleCanvasClick = (event) => {
        if (!isTraining && chartRef.current) {
            setShouldAnimateDecisionBoundary(false)
            const canvas = chartRef.current
            const rect = canvas.getBoundingClientRect()

            const scaleX = canvas.width / rect.width
            const scaleY = canvas.height / rect.height

            const x = ((event.clientX - rect.left) * scaleX) / canvas.width
            const y = 1 - ((event.clientY - rect.top) * scaleY) / canvas.height

            const xValue = Math.max(0, Math.min(1, x))
            const yValue = Math.max(0, Math.min(1, y))

            setPoints([
                ...points,
                { x: xValue, y: yValue, class: currentClass },
            ])
        }
    }

    // Generate decision boundary points
    const generateDecisionBoundary = () => {
        const { w1, w2, b } = weights
        const points = []
        const resolution = 50

        for (let x = -0.2; x <= 1.2; x += 1.2 / resolution) {
            const y = -(w1 * x + b) / w2
            if (y >= -0.2 && y <= 1.2) {
                points.push({ x, y })
            }
        }
        return points
    }

    // Generate random points following a linearly separable pattern
    const generateRandomPoints = () => {
        if (isTraining) return

        const newPoints = []
        const numPointsPerClass = 15

        // Generate class 0 points (mostly in the bottom-left)
        for (let i = 0; i < numPointsPerClass; i++) {
            // Base coordinates biased toward lower-left quadrant
            const x = Math.random() * 0.6
            const y = Math.random() * 0.6

            // Add some noise to make it more interesting
            const xNoise = (Math.random() - 0.5) * 0.3
            const yNoise = (Math.random() - 0.5) * 0.3

            const xValue = Math.max(0, Math.min(1, x + xNoise))
            const yValue = Math.max(0, Math.min(1, y + yNoise))

            newPoints.push({ x: xValue, y: yValue, class: 0 })
        }

        // Generate class 1 points (mostly in the top-right)
        for (let i = 0; i < numPointsPerClass; i++) {
            // Base coordinates biased toward upper-right quadrant
            const x = 0.4 + Math.random() * 0.6
            const y = 0.4 + Math.random() * 0.6

            // Add some noise to make it more interesting
            const xNoise = (Math.random() - 0.5) * 0.3
            const yNoise = (Math.random() - 0.5) * 0.3

            const xValue = Math.max(0, Math.min(1, x + xNoise))
            const yValue = Math.max(0, Math.min(1, y + yNoise))

            newPoints.push({ x: xValue, y: yValue, class: 1 })
        }

        setPoints(newPoints)
        setWeights({ w1: 0, w2: 0, b: 0 })
        setShowDecisionBoundary(false)
        setShouldAnimateDecisionBoundary(false)
    }

    // Train the model using gradient descent
    const trainModel = async () => {
        setIsTraining(true)
        let w1 = 0,
            w2 = 0,
            b = 0
        const learningRate = 0.1
        const epochs = 200
        const lambda = 0.01
        const miniBatchSize = 8

        for (let epoch = 0; epoch < epochs; epoch++) {
            const shuffledPoints = [...points].sort(() => Math.random() - 0.5)

            for (let i = 0; i < shuffledPoints.length; i += miniBatchSize) {
                const batch = shuffledPoints.slice(i, i + miniBatchSize)
                let dw1 = 0,
                    dw2 = 0,
                    db = 0

                batch.forEach((point) => {
                    const z = w1 * point.x + w2 * point.y + b
                    const a = sigmoid(z)
                    const error = a - point.class

                    dw1 += error * point.x
                    dw2 += error * point.y
                    db += error
                })

                dw1 = dw1 / batch.length + lambda * w1
                dw2 = dw2 / batch.length + lambda * w2
                db = db / batch.length

                w1 -= learningRate * dw1
                w2 -= learningRate * dw2
                b -= learningRate * db
            }

            if (epoch % 20 === 0) {
                setWeights({ w1, w2, b })
                await new Promise((resolve) => setTimeout(resolve, 50))
            }
        }

        setWeights({ w1, w2, b })

        const findOptimalThreshold = () => {
            let bestThreshold = 0.5
            let bestF1 = 0

            for (let threshold = 0.1; threshold <= 0.9; threshold += 0.1) {
                const predictions = points.map((point) => {
                    const z = w1 * point.x + w2 * point.y + b
                    return sigmoid(z) >= threshold ? 1 : 0
                })

                let tp = 0,
                    fp = 0,
                    fn = 0
                points.forEach((point, i) => {
                    if (point.class === 1 && predictions[i] === 1) tp++
                    if (point.class === 0 && predictions[i] === 1) fp++
                    if (point.class === 1 && predictions[i] === 0) fn++
                })

                const precision = tp / (tp + fp) || 0
                const recall = tp / (tp + fn) || 0
                const f1 = (2 * precision * recall) / (precision + recall) || 0

                if (f1 > bestF1) {
                    bestF1 = f1
                    bestThreshold = threshold
                }
            }
            return bestThreshold
        }

        const optimalThreshold = findOptimalThreshold()
        const predictions = points.map((point) => {
            const z = w1 * point.x + w2 * point.y + b
            return sigmoid(z) >= optimalThreshold ? 1 : 0
        })

        let tp = 0,
            fp = 0,
            tn = 0,
            fn = 0
        points.forEach((point, i) => {
            if (point.class === 1 && predictions[i] === 1) tp++
            if (point.class === 0 && predictions[i] === 1) fp++
            if (point.class === 0 && predictions[i] === 0) tn++
            if (point.class === 1 && predictions[i] === 0) fn++
        })

        const accuracy = (tp + tn) / points.length
        const precision = tp / (tp + fp) || 0
        const recall = tp / (tp + fn) || 0
        const f1 = (2 * precision * recall) / (precision + recall) || 0

        setMetrics({
            accuracy,
            precision,
            recall,
            f1,
            threshold: optimalThreshold,
        })
        setShouldAnimateDecisionBoundary(true)
        setShowDecisionBoundary(true)
        setIsTraining(false)
    }

    // Clear all points
    const clearPoints = () => {
        setPoints([])
        setWeights({ w1: 0, w2: 0, b: 0 })
        setShowDecisionBoundary(false)
        setShouldAnimateDecisionBoundary(false)
    }

    return (
        <AlgorithmLayout title="Logistic Regression">
            <div className="px-2 sm:px-4">
                <div className="mb-5">
                    <p className="text-gray-700 mb-3">
                        Logistic regression is used for binary classification
                        problems. Add points of different classes, then train
                        the model to find the decision boundary separating them.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4 items-center">
                        <div className="flex items-center space-x-4 mr-4">
                            <div>
                                <input
                                    type="radio"
                                    id="class0"
                                    checked={currentClass === 0}
                                    onChange={() => setCurrentClass(0)}
                                    className="mr-2"
                                />
                                <label
                                    htmlFor="class0"
                                    className="text-blue-600 cursor-pointer"
                                    style={{ color: "rgba(54, 162, 235, 1)" }}
                                >
                                    Class 0
                                </label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="class1"
                                    checked={currentClass === 1}
                                    onChange={() => setCurrentClass(1)}
                                    className="mr-2"
                                />
                                <label
                                    htmlFor="class1"
                                    className="text-red-500 cursor-pointer"
                                    style={{ color: "rgba(255, 99, 132, 1)" }}
                                >
                                    Class 1
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={trainModel}
                            disabled={
                                isTraining ||
                                points.filter((p) => p.class === 0).length <
                                    1 ||
                                points.filter((p) => p.class === 1).length < 1
                            }
                            className={`px-4 py-2 rounded-lg ${
                                isTraining ||
                                points.filter((p) => p.class === 0).length <
                                    1 ||
                                points.filter((p) => p.class === 1).length < 1
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
                                <li>Select a class (0 or 1)</li>
                                <li>Click on the graph to add data points</li>
                                <li>Add at least one point from each class</li>
                                <li>
                                    Click &apos;Train Model&apos; to find the
                                    decision boundary
                                </li>
                            </ol>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-md border-2 border-indigo-200 p-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-200/50 rounded-bl-full"></div>
                            <h3 className="text-lg font-bold mb-3 text-indigo-800 border-b-2 border-indigo-200 pb-1 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 text-indigo-600"
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
                                <p className="text-indigo-900 bg-indigo-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                    <span className="font-medium">w₁:</span>
                                    <span className="font-bold bg-indigo-200 px-2 py-0.5 rounded-md">
                                        {weights.w1.toFixed(4)}
                                    </span>
                                </p>
                                <p className="text-indigo-900 bg-indigo-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                    <span className="font-medium">w₂:</span>
                                    <span className="font-bold bg-indigo-200 px-2 py-0.5 rounded-md">
                                        {weights.w2.toFixed(4)}
                                    </span>
                                </p>
                                <p className="text-indigo-900 bg-indigo-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                    <span className="font-medium">
                                        b (bias):
                                    </span>
                                    <span className="font-bold bg-indigo-200 px-2 py-0.5 rounded-md">
                                        {weights.b.toFixed(4)}
                                    </span>
                                </p>
                                <div className="bg-white/60 rounded-md p-2 mt-2 border border-indigo-200">
                                    <p className="text-indigo-800 font-medium text-center text-sm">
                                        P(class=1) = 1/(1+e
                                        <sup>
                                            -({weights.w1.toFixed(2)}x₁ +{" "}
                                            {weights.w2.toFixed(2)}x₂ +{" "}
                                            {weights.b.toFixed(2)})
                                        </sup>
                                        )
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl shadow-md border-2 border-rose-200 p-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-rose-200/50 rounded-bl-full"></div>
                            <h3 className="text-lg font-bold mb-3 text-rose-800 border-b-2 border-rose-200 pb-1 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 text-rose-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                </svg>
                                Performance Metrics
                            </h3>
                            <div className="space-y-2 relative z-10">
                                <p className="text-rose-900 bg-rose-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                    <span className="font-medium">
                                        Accuracy:
                                    </span>
                                    <span className="font-bold bg-rose-200 px-2 py-0.5 rounded-md">
                                        {(metrics.accuracy * 100).toFixed(1)}%
                                    </span>
                                </p>
                                <p className="text-rose-900 bg-rose-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                    <span className="font-medium">
                                        Precision:
                                    </span>
                                    <span className="font-bold bg-rose-200 px-2 py-0.5 rounded-md">
                                        {(metrics.precision * 100).toFixed(1)}%
                                    </span>
                                </p>
                                <p className="text-rose-900 bg-rose-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                    <span className="font-medium">Recall:</span>
                                    <span className="font-bold bg-rose-200 px-2 py-0.5 rounded-md">
                                        {(metrics.recall * 100).toFixed(1)}%
                                    </span>
                                </p>
                                <p className="text-rose-900 bg-rose-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                    <span className="font-medium">
                                        F1 Score:
                                    </span>
                                    <span className="font-bold bg-rose-200 px-2 py-0.5 rounded-md">
                                        {(metrics.f1 * 100).toFixed(1)}%
                                    </span>
                                </p>
                                <p className="text-rose-900 bg-rose-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                    <span className="font-medium">
                                        Threshold:
                                    </span>
                                    <span className="font-bold bg-rose-200 px-2 py-0.5 rounded-md">
                                        {metrics.threshold.toFixed(2)}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <LogisticRegressionTheory />
            </div>
        </AlgorithmLayout>
    )
}

export default LogisticRegression
