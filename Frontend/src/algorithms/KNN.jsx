import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"
import { useNavigate } from "react-router-dom"
import AlgorithmLayout from "./AlgorithmLayout"
import { motion } from "framer-motion"

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
    const [metrics, setMetrics] = useState({
        confusionMatrix: null,
    })

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
                            backgroundColor: "rgba(54, 162, 235, 0.5)",
                            pointRadius: 8,
                            animation: false,
                        },
                        {
                            label: "Class 1",
                            data: points.filter((p) => p.class === 1),
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                            pointRadius: 8,
                            animation: false,
                        },

                        {
                            label: "Class 2",
                            data: points.filter((p) => p.class === 2),
                            backgroundColor: "rgba(75, 192, 192, 0.5)", // Teal color for class 2
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
                                              ? "rgba(255, 206, 86, 0.5)"
                                              : prediction === 0
                                              ? "rgba(54, 162, 235, 0.5)"
                                              : prediction === 1
                                              ? "rgba(255, 99, 132, 0.5)"
                                              : "rgba(75, 192, 192, 0.5)",
                                      pointRadius: 12,
                                      pointStyle: "triangle",
                                  },
                                  {
                                      label: "Nearest Neighbors",
                                      data: nearestNeighbors.map(
                                          (n) => n.point
                                      ),
                                      backgroundColor:
                                          "rgba(255, 206, 86, 0.5)",
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

            setPoints([
                ...points,
                { x: xValue, y: yValue, class: currentClass },
            ])
        }
    }

    // Add test point
    const handleAddTestPoint = (event) => {
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

            const newTestPoint = { x: xValue, y: yValue }
            setTestPoint(newTestPoint)
            if (points.length >= kValue) {
                predictClass(newTestPoint)
            }
        }
    }

    // Add function to calculate metrics using leave-one-out cross validation
    const calculateMetrics = () => {
        if (points.length < kValue) return

        const matrix = Array(3)
            .fill()
            .map(() => Array(3).fill(0))

        // Leave-one-out cross validation
        points.forEach((testPoint, idx) => {
            const otherPoints = points.filter((_, i) => i !== idx)

            // Calculate distances
            const distances = otherPoints.map((p) => ({
                point: p,
                distance: calculateDistance(p, testPoint),
            }))

            // Get k nearest
            const nearest = distances
                .sort((a, b) => a.distance - b.distance)
                .slice(0, kValue)

            // Predict class
            const classCounts = nearest.reduce((counts, n) => {
                counts[n.point.class] = (counts[n.point.class] || 0) + 1
                return counts
            }, {})

            const predictedClass = Object.entries(classCounts).reduce(
                (max, [classLabel, count]) =>
                    count > (classCounts[max] || 0)
                        ? parseInt(classLabel)
                        : max,
                0
            )

            // Update confusion matrix
            matrix[testPoint.class][predictedClass]++
        })

        setMetrics({
            confusionMatrix: matrix,
        })
    }

    // Call calculateMetrics when points or k changes
    useEffect(() => {
        calculateMetrics()
    }, [points, kValue])

    // Add this function to calculate per-class metrics
    const calculateClassMetrics = (matrix, classIndex) => {
        const tp = matrix[classIndex][classIndex]
        let fp = 0,
            fn = 0

        // Calculate FP and FN
        for (let i = 0; i < matrix.length; i++) {
            if (i !== classIndex) {
                fp += matrix[i][classIndex] // Other classes predicted as this class
                fn += matrix[classIndex][i] // This class predicted as other classes
            }
        }

        const precision = tp / (tp + fp) || 0
        const recall = tp / (tp + fn) || 0
        const f1 = (2 * (precision * recall)) / (precision + recall) || 0

        return { tp, fp, fn, precision, recall, f1 }
    }

    // Clear all points
    const clearPoints = () => {
        setPoints([])
        setTestPoint(null)
        setNearestNeighbors([])
        setPrediction(null)
    }

    return (
        <AlgorithmLayout title="K-Nearest Neighbors">
            <motion.div
                className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-6">
                    <p className="text-gray-700 mb-4">
                        K-Nearest Neighbors classifies data points based on the
                        classes of their nearest neighbors. Add training points,
                        set the k value, then add a test point to see the
                        classification.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6 items-center">
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
                                    className="cursor-pointer"
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
                                    className="cursor-pointer"
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
                                    onChange={() => setCurrentClass(2)}
                                    className="mr-2"
                                />
                                <label
                                    htmlFor="class2"
                                    className="cursor-pointer"
                                    style={{ color: "rgba(75, 192, 192, 1)" }}
                                >
                                    Class 2
                                </label>
                            </div>
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

                        <div className="flex items-center">
                            <label
                                htmlFor="kValue"
                                className="mr-2 text-gray-700"
                            >
                                K value:
                            </label>
                            <input
                                id="kValue"
                                type="number"
                                min="1"
                                max="10"
                                value={kValue}
                                onChange={(e) =>
                                    setKValue(
                                        Math.min(
                                            10,
                                            Math.max(
                                                1,
                                                parseInt(e.target.value) || 1
                                            )
                                        )
                                    )
                                }
                                className="w-16 px-2 py-1 border rounded bg-white/50"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-sm bg-white/50 px-3 py-1 rounded-full text-gray-700">
                            Left click: Add training points
                        </span>
                        <span className="text-sm bg-white/50 px-3 py-1 rounded-full text-gray-700">
                            Right click: Add test point
                        </span>
                        {prediction !== null && (
                            <span className="text-sm bg-amber-100 px-3 py-1 rounded-full text-gray-700 font-medium">
                                Prediction: Class {prediction}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/70 rounded-xl shadow-sm p-4">
                        <div
                            className="w-full h-[500px]"
                            onClick={handleCanvasClick}
                            onContextMenu={(e) => {
                                e.preventDefault()
                                handleAddTestPoint(e)
                            }}
                            style={{ cursor: "crosshair" }}
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
                                Instructions
                            </h3>
                            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                                <li>Select a class (0, 1, or 2)</li>
                                <li>Left click to add training points</li>
                                <li>Right click to add or move a test point</li>
                                <li>Adjust the K value as needed</li>
                                <li>
                                    The test point will be classified based on
                                    the {kValue} nearest neighbors
                                </li>
                            </ol>
                        </div>

                        {points.length >= kValue && metrics.confusionMatrix && (
                            <div className="bg-white/70 rounded-xl shadow-sm p-4">
                                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                    Model Validation
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    Leave-one-out cross-validation metrics:
                                </p>

                                <div className="space-y-4 mt-4">
                                    {[0, 1, 2].map((classIndex) => {
                                        const classMetrics =
                                            calculateClassMetrics(
                                                metrics.confusionMatrix,
                                                classIndex
                                            )
                                        return (
                                            <div
                                                key={classIndex}
                                                className="bg-white/50 p-2 rounded"
                                            >
                                                <p className="font-medium text-gray-700 mb-1">
                                                    Class {classIndex}:
                                                </p>
                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <p className="text-gray-700">
                                                        Precision:{" "}
                                                        {(
                                                            classMetrics.precision *
                                                            100
                                                        ).toFixed(1)}
                                                        %
                                                    </p>
                                                    <p className="text-gray-700">
                                                        Recall:{" "}
                                                        {(
                                                            classMetrics.recall *
                                                            100
                                                        ).toFixed(1)}
                                                        %
                                                    </p>
                                                    <p className="text-gray-700">
                                                        F1 Score:{" "}
                                                        {(
                                                            classMetrics.f1 *
                                                            100
                                                        ).toFixed(1)}
                                                        %
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {testPoint && nearestNeighbors.length > 0 && (
                            <div className="bg-white/70 rounded-xl shadow-sm p-4">
                                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                    Test Point Details
                                </h3>
                                <p className="text-gray-700 mb-2">
                                    <span className="font-medium">
                                        Coordinates:
                                    </span>{" "}
                                    ({testPoint.x.toFixed(2)},{" "}
                                    {testPoint.y.toFixed(2)})
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <span className="font-medium">
                                        Prediction:
                                    </span>{" "}
                                    Class {prediction}
                                </p>
                                <p className="text-gray-700 mb-2 font-medium">
                                    Nearest neighbors:
                                </p>
                                <div className="max-h-32 overflow-y-auto text-sm">
                                    {nearestNeighbors.map((n, idx) => (
                                        <div
                                            key={idx}
                                            className="mb-1 border-b border-gray-100 pb-1"
                                        >
                                            <p>
                                                Point #{idx + 1}: Class{" "}
                                                {n.point.class} at distance{" "}
                                                {n.distance.toFixed(3)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AlgorithmLayout>
    )
}

export default KNN
