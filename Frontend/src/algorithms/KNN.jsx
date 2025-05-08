import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"
import { useNavigate } from "react-router-dom"
import AlgorithmLayout from "./AlgorithmLayout"
import { motion } from "framer-motion"
import KNNTheory from "../components/theory/KNNTheory"

const KNN = () => {
    const chartRef = useRef(null)
    const chartInstance = useRef(null)
    const navigate = useNavigate()

    const [points, setPoints] = useState([])
    const [currentClass, setCurrentClass] = useState(0) // 0, 1, or 2 now
    const [kValue, setKValue] = useState(3)
    const [testPoint, setTestPoint] = useState(null)
    const [nearestNeighbors, setNearestNeighbors] = useState([])
    const [prediction, setPrediction] = useState(null)
    const [addingTestPoint, setAddingTestPoint] = useState(false)

    // Calculate Euclidean distance between two points
    const calculateDistance = (p1, p2) => {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
    }

    // Predict class for a test point (modified for 3 classes)
    const predictClass = (point) => {
        const distances = points.map((p) => ({
            point: p,
            distance: calculateDistance(p, point),
        }))

        const nearest = distances
            .sort((a, b) => a.distance - b.distance)
            .slice(0, kValue)

        setNearestNeighbors(nearest)

        // Count classes among nearest neighbors
        const classCounts = nearest.reduce((counts, n) => {
            counts[n.point.class] = (counts[n.point.class] || 0) + 1
            return counts
        }, {})

        // Find class with maximum votes
        const predictedClass = Object.entries(classCounts).reduce(
            (max, [classLabel, count]) =>
                count > (classCounts[max] || 0) ? parseInt(classLabel) : max,
            0
        )

        setPrediction(predictedClass)
        return predictedClass
    }

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
                            pointRadius: 8,
                            animation: false,
                        },
                        {
                            label: "Class 1",
                            data: points.filter((p) => p.class === 1),
                            backgroundColor: "rgba(255, 99, 132, 0.7)",
                            pointRadius: 8,
                            animation: false,
                        },

                        {
                            label: "Class 2",
                            data: points.filter((p) => p.class === 2),
                            backgroundColor: "rgba(75, 192, 192, 0.7)", // Teal color for class 2
                            pointRadius: 8,
                            animation: false,
                        },
                        ...(testPoint
                            ? [
                                  {
                                      label: "Test Point",
                                      data: [testPoint],
                                      backgroundColor:
                                          prediction === null
                                              ? "rgba(255, 206, 86, 0.7)"
                                              : prediction === 0
                                              ? "rgba(54, 162, 235, 0.7)"
                                              : prediction === 1
                                              ? "rgba(255, 99, 132, 0.7)"
                                              : "rgba(75, 192, 192, 0.7)",
                                      pointRadius: 12,
                                      pointStyle: "triangle",
                                  },
                                  {
                                      label: "Nearest Neighbors",
                                      data: nearestNeighbors.map(
                                          (n) => n.point
                                      ),
                                      backgroundColor:
                                          "rgba(255, 206, 86, 0.7)",
                                      pointRadius: 12,
                                      pointBorderWidth: 2,
                                      pointBorderColor: "rgba(255, 206, 86, 1)",
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
                },
            })
        }
    }, [points, testPoint, nearestNeighbors, prediction])

    // Handle canvas click for adding points
    const handleCanvasClick = (event) => {
        if (chartRef.current) {
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

            if (addingTestPoint) {
                const newTestPoint = { x: xValue, y: yValue }
                setTestPoint(newTestPoint)
                if (points.length >= kValue) {
                    predictClass(newTestPoint)
                }
                // Don't set addingTestPoint to false so it stays in test point mode
            } else {
                setPoints([
                    ...points,
                    { x: xValue, y: yValue, class: currentClass },
                ])
            }
        }
    }

    // Toggle test point mode
    const handleAddTestPoint = () => {
        setAddingTestPoint(!addingTestPoint)
    }

    // Clear points
    const clearPoints = () => {
        setPoints([])
        setTestPoint(null)
        setNearestNeighbors([])
        setPrediction(null)
        setAddingTestPoint(false)
    }

    // Generate random points for all classes
    const generateRandomPoints = () => {
        const newPoints = []
        const numPointsPerClass = 12

        // Generate class 0 points (bottom-left corner)
        for (let i = 0; i < numPointsPerClass; i++) {
            // Center of cluster (bottom-left)
            const centerX = 0.25
            const centerY = 0.25

            // Add gaussian-like noise with controlled spread
            const angle = Math.random() * 2 * Math.PI
            const radius = 0.15 * Math.sqrt(Math.random()) // Use sqrt for better distribution

            const xValue = Math.max(
                0,
                Math.min(1, centerX + radius * Math.cos(angle))
            )
            const yValue = Math.max(
                0,
                Math.min(1, centerY + radius * Math.sin(angle))
            )

            newPoints.push({ x: xValue, y: yValue, class: 0 })
        }

        // Generate class 1 points (top-right corner)
        for (let i = 0; i < numPointsPerClass; i++) {
            // Center of cluster (top-right)
            const centerX = 0.75
            const centerY = 0.75

            // Add gaussian-like noise
            const angle = Math.random() * 2 * Math.PI
            const radius = 0.15 * Math.sqrt(Math.random())

            const xValue = Math.max(
                0,
                Math.min(1, centerX + radius * Math.cos(angle))
            )
            const yValue = Math.max(
                0,
                Math.min(1, centerY + radius * Math.sin(angle))
            )

            newPoints.push({ x: xValue, y: yValue, class: 1 })
        }

        // Generate class 2 points (top-left but with some overlap)
        for (let i = 0; i < numPointsPerClass; i++) {
            // Center of cluster (top-left with slight shift toward center)
            const centerX = 0.3
            const centerY = 0.7

            // Add gaussian-like noise
            const angle = Math.random() * 2 * Math.PI
            const radius = 0.18 * Math.sqrt(Math.random()) // Slightly larger radius for more overlap

            const xValue = Math.max(
                0,
                Math.min(1, centerX + radius * Math.cos(angle))
            )
            const yValue = Math.max(
                0,
                Math.min(1, centerY + radius * Math.sin(angle))
            )

            newPoints.push({ x: xValue, y: yValue, class: 2 })
        }

        setPoints(newPoints)
        setTestPoint(null)
        setNearestNeighbors([])
        setPrediction(null)
        setAddingTestPoint(false)
    }

    // Turn off test point mode when changing class selection
    const handleClassChange = (classValue) => {
        setCurrentClass(classValue)
        setAddingTestPoint(false)
        setTestPoint(null)
        setNearestNeighbors([])
        setPrediction(null)
    }

    return (
        <AlgorithmLayout title="K-Nearest Neighbors">
            <div className="px-2 sm:px-4">
                <div className="mb-5">
                    <p className="text-gray-700 mb-3">
                        KNN classifies points based on their nearest neighbors.
                        Select a class to add points, set K, then add a test
                        point to see classification in action.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4 items-center">
                        <div className="flex items-center gap-3 mr-4">
                            <div>
                                <input
                                    type="radio"
                                    id="class0"
                                    checked={currentClass === 0}
                                    onChange={() => handleClassChange(0)}
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
                                    onChange={() => handleClassChange(1)}
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
                            <div>
                                <input
                                    type="radio"
                                    id="class2"
                                    checked={currentClass === 2}
                                    onChange={() => handleClassChange(2)}
                                    className="mr-2"
                                />
                                <label
                                    htmlFor="class2"
                                    className="text-teal-500 cursor-pointer"
                                    style={{ color: "rgba(75, 192, 192, 1)" }}
                                >
                                    Class 2
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <label htmlFor="kValue" className="text-gray-700">
                                K:
                            </label>
                            <input
                                type="range"
                                id="kValue"
                                min="1"
                                max="15"
                                value={kValue}
                                onChange={(e) => {
                                    setKValue(Number(e.target.value))
                                    setAddingTestPoint(false)
                                }}
                                className="w-24"
                            />
                            <span className="text-gray-700 min-w-[20px]">
                                {kValue}
                            </span>
                        </div>

                        <button
                            onClick={clearPoints}
                            disabled={points.length === 0}
                            className={`px-4 py-2 rounded-lg ${
                                points.length === 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-red-500/80 text-white hover:bg-red-500/90"
                            }`}
                        >
                            Clear All
                        </button>

                        <button
                            onClick={generateRandomPoints}
                            className="px-4 py-2 rounded-lg bg-amber-400 text-amber-900 hover:bg-amber-500"
                        >
                            Generate Random Points
                        </button>

                        <button
                            onClick={handleAddTestPoint}
                            disabled={points.length < kValue}
                            className={`px-4 py-2 rounded-lg ${
                                points.length < kValue
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : addingTestPoint
                                    ? "bg-green-600 text-white"
                                    : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                        >
                            {addingTestPoint
                                ? "Adding Test Point"
                                : "Add Test Point"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <div className="lg:col-span-3 bg-white/95 rounded-xl shadow-md border border-amber-200 overflow-hidden">
                        <div
                            className="w-full h-[520px] relative"
                            onClick={handleCanvasClick}
                            style={{
                                cursor: addingTestPoint
                                    ? "crosshair"
                                    : "pointer",
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
                                <li>Select a class (0, 1, or 2)</li>
                                <li>Click on the graph to add data points</li>
                                <li>Adjust K value (number of neighbors)</li>
                                <li>
                                    Click "Add Test Point" then place it on the
                                    graph
                                </li>
                                <li>
                                    Move test point to see classification update
                                </li>
                                <li>
                                    Use "Generate Random Points" to create
                                    sample data
                                </li>
                            </ol>
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
                                    <path
                                        fillRule="evenodd"
                                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                                        clipRule="evenodd"
                                    />
                                    <path d="M10 6a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 110-2h1V7a1 1 0 011-1z" />
                                </svg>
                                Algorithm Info
                            </h3>
                            <div className="space-y-2 relative z-10">
                                <p className="text-blue-900 bg-blue-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                    <span className="font-medium">Points:</span>
                                    <span className="font-bold bg-blue-200 px-2 py-0.5 rounded-md">
                                        {points.length}
                                    </span>
                                </p>
                                <p className="text-blue-900 bg-blue-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                    <span className="font-medium">
                                        K Value:
                                    </span>
                                    <span className="font-bold bg-blue-200 px-2 py-0.5 rounded-md">
                                        {kValue}
                                    </span>
                                </p>
                                {testPoint && (
                                    <p className="text-blue-900 bg-blue-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                        <span className="font-medium">
                                            Prediction:
                                        </span>
                                        <span
                                            className="font-bold px-2 py-0.5 rounded-md"
                                            style={{
                                                backgroundColor:
                                                    prediction === 0
                                                        ? "rgba(54, 162, 235, 1)"
                                                        : prediction === 1
                                                        ? "rgba(255, 99, 132, 1)"
                                                        : "rgba(75, 192, 192, 1)",
                                                color: "#fff",
                                            }}
                                        >
                                            Class {prediction}
                                        </span>
                                    </p>
                                )}
                                {addingTestPoint && (
                                    <p className="text-amber-600 font-medium bg-amber-50 border border-amber-200 rounded-md px-3 py-1 mt-2 flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-1 animate-pulse"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Click on the graph to place or move test
                                        point
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <KNNTheory />
            </div>
        </AlgorithmLayout>
    )
}

export default KNN
