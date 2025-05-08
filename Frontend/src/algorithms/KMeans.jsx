import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"
import { useNavigate } from "react-router-dom"
import AlgorithmLayout from "./AlgorithmLayout"
import { motion } from "framer-motion"

const KMeans = () => {
    const chartRef = useRef(null)
    const chartInstance = useRef(null)
    const navigate = useNavigate()

    const [points, setPoints] = useState([])
    const [centroids, setCentroids] = useState([])
    const [k, setK] = useState(3)
    const [iterations, setIterations] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [clusters, setClusters] = useState([])

    // Calculate Euclidean distance between two points
    const calculateDistance = (p1, p2) => {
        if (!p1 || !p2) return Infinity
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
    }

    // Assign points to nearest centroid
    const assignToClusters = (points, centroids) => {
        if (!points.length || !centroids.length) return []

        return points.map((point) => {
            const distances = centroids.map((centroid) =>
                calculateDistance(point, centroid)
            )
            const nearestCentroidIndex = distances.indexOf(
                Math.min(...distances)
            )
            return { ...point, cluster: nearestCentroidIndex }
        })
    }

    // Update centroid positions
    const updateCentroids = (clusteredPoints, k) => {
        if (!clusteredPoints.length) return []

        return Array(k)
            .fill()
            .map((_, i) => {
                const clusterPoints = clusteredPoints.filter(
                    (p) => p.cluster === i
                )
                if (clusterPoints.length === 0) {
                    // If no points in cluster, return random position
                    return {
                        x: Math.random(),
                        y: Math.random(),
                    }
                }

                return {
                    x:
                        clusterPoints.reduce((sum, p) => sum + p.x, 0) /
                        clusterPoints.length,
                    y:
                        clusterPoints.reduce((sum, p) => sum + p.y, 0) /
                        clusterPoints.length,
                }
            })
    }

    // Start clustering process
    const startClustering = async () => {
        if (isRunning || points.length < k) return

        setIsRunning(true)
        setIterations(0)

        try {
            // Step 1: Initialize centroids with animation
            const initialCentroids = Array(k)
                .fill()
                .map(() => ({
                    x: Math.random(),
                    y: Math.random(),
                }))
            setCentroids(initialCentroids)

            // Initial pause to show random centroids
            await new Promise((resolve) => setTimeout(resolve, 1000))

            let currentCentroids = [...initialCentroids]
            let iterationCount = 0
            const MAX_ITERATIONS = 50

            while (iterationCount < MAX_ITERATIONS) {
                // Step 2: Assign points to clusters (with delay)
                const clusteredPoints = assignToClusters(
                    points,
                    currentCentroids
                )
                setClusters(clusteredPoints)
                await new Promise((resolve) => setTimeout(resolve, 500))

                // Step 3: Update centroids with interpolation
                const newCentroids = updateCentroids(clusteredPoints, k)

                // Animate centroid movement
                const STEPS = 10
                for (let step = 0; step <= STEPS; step++) {
                    const interpolatedCentroids = currentCentroids.map(
                        (oldCentroid, i) => ({
                            x:
                                oldCentroid.x +
                                (newCentroids[i].x - oldCentroid.x) *
                                    (step / STEPS),
                            y:
                                oldCentroid.y +
                                (newCentroids[i].y - oldCentroid.y) *
                                    (step / STEPS),
                        })
                    )
                    setCentroids(interpolatedCentroids)
                    await new Promise((resolve) => setTimeout(resolve, 50))
                }

                // Step 4: Check for convergence
                const hasConverged = currentCentroids.every(
                    (centroid, i) =>
                        calculateDistance(centroid, newCentroids[i]) < 0.00001
                )

                setIterations(iterationCount + 1)

                // If converged, stop
                if (hasConverged) break

                // Update for next iteration
                currentCentroids = [...newCentroids]
                iterationCount++
            }
        } catch (error) {
            console.error("Error in clustering:", error)
            setClusters([])
            setCentroids([])
            setIterations(0)
        } finally {
            setIsRunning(false)
        }
    }

    // Handle canvas click for adding points
    const handleCanvasClick = (event) => {
        if (!isRunning && chartRef.current) {
            const canvas = chartRef.current
            const rect = canvas.getBoundingClientRect()

            const scaleX = canvas.width / rect.width
            const scaleY = canvas.height / rect.height

            const x = ((event.clientX - rect.left) * scaleX) / canvas.width
            const y = 1 - ((event.clientY - rect.top) * scaleY) / canvas.height

            const xValue = Math.max(0, Math.min(1, x))
            const yValue = Math.max(0, Math.min(1, y))

            setPoints([...points, { x: xValue, y: yValue }])
        }
    }

    // Initialize and update chart
    useEffect(() => {
        if (!chartRef.current) return

        if (chartInstance.current) {
            chartInstance.current.destroy()
        }

        const ctx = chartRef.current.getContext("2d")
        const data = {
            datasets: [
                {
                    label: "Data Points",
                    data: points,
                    backgroundColor: clusters.length
                        ? clusters.map(
                              (p) =>
                                  `hsl(${
                                      ((p.cluster * 360) / k) % 360
                                  }, 70%, 70%)`
                          )
                        : Array(points.length).fill("rgba(54, 162, 235, 0.5)"),
                    pointRadius: 8,
                },
                {
                    label: "Centroids",
                    data: centroids,
                    backgroundColor: Array(k)
                        .fill()
                        .map(
                            (_, i) => `hsl(${((i * 360) / k) % 360}, 70%, 50%)`
                        ),
                    pointRadius: 12,
                    pointStyle: "triangle",
                },
            ],
        }

        chartInstance.current = new Chart(ctx, {
            type: "scatter",
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0, // Shorter animation duration
                },
                transitions: {
                    active: {
                        animation: {
                            duration: 0,
                        },
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
            },
        })
    }, [points, centroids, clusters, k])

    // Also modify the clear function to reset everything properly
    const handleClear = () => {
        setPoints([])
        setCentroids([])
        setClusters([])
        setIterations(0)
        setIsRunning(false)
    }

    return (
        <AlgorithmLayout title="K-Means Clustering">
            <motion.div
                className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-6">
                    <p className="text-gray-700 mb-4">
                        K-Means clustering groups data points into clusters
                        based on similarity. Click on the graph to add points,
                        set the number of clusters, then start the algorithm to
                        see clustering in action.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6 items-center">
                        <button
                            onClick={startClustering}
                            disabled={isRunning || points.length < k}
                            className={`px-4 py-2 rounded-lg ${
                                isRunning || points.length < k
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:shadow-md"
                            }`}
                        >
                            {isRunning ? "Clustering..." : "Start Clustering"}
                        </button>

                        <button
                            onClick={handleClear}
                            disabled={isRunning || points.length === 0}
                            className={`px-4 py-2 rounded-lg ${
                                isRunning || points.length === 0
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
                                Number of clusters (k):
                            </label>
                            <input
                                id="kValue"
                                type="number"
                                min="2"
                                max="6"
                                value={k}
                                onChange={(e) =>
                                    setK(
                                        Math.min(
                                            6,
                                            Math.max(
                                                2,
                                                parseInt(e.target.value) || 2
                                            )
                                        )
                                    )
                                }
                                disabled={isRunning}
                                className="w-16 px-2 py-1 border rounded bg-white/50"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-sm bg-white/50 px-3 py-1 rounded-full text-gray-700">
                            Points: {points.length}
                        </span>
                        <span className="text-sm bg-white/50 px-3 py-1 rounded-full text-gray-700">
                            Clusters: {k}
                        </span>
                        <span
                            className={`text-sm ${
                                isRunning ? "bg-amber-100" : "bg-white/50"
                            } px-3 py-1 rounded-full text-gray-700`}
                        >
                            Iterations: {iterations}
                        </span>
                        {points.length < k && (
                            <span className="text-sm bg-red-100 px-3 py-1 rounded-full text-red-700">
                                Add at least {k} points to start
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/70 rounded-xl shadow-sm p-4">
                        <div
                            className="w-full h-[500px]"
                            onClick={handleCanvasClick}
                            style={{
                                cursor: isRunning ? "default" : "crosshair",
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
                                Instructions
                            </h3>
                            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                                <li>Click on the graph to add data points</li>
                                <li>
                                    Set the number of clusters (k) between 2 and
                                    6
                                </li>
                                <li>
                                    Click "Start Clustering" to begin the
                                    algorithm
                                </li>
                                <li>
                                    Watch as points get assigned to clusters
                                </li>
                                <li>
                                    Triangles represent the cluster centroids
                                </li>
                            </ol>
                        </div>

                        <div className="bg-white/70 rounded-xl shadow-sm p-4">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                Algorithm Details
                            </h3>
                            <div className="space-y-2 text-sm text-gray-700">
                                <p>
                                    <span className="font-medium">
                                        Initialization:
                                    </span>{" "}
                                    Random placement of {k} centroids
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Assignment:
                                    </span>{" "}
                                    Each point is assigned to the nearest
                                    centroid
                                </p>
                                <p>
                                    <span className="font-medium">Update:</span>{" "}
                                    Centroids move to the average position of
                                    their points
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Convergence:
                                    </span>{" "}
                                    Algorithm stops when centroids stabilize
                                </p>
                            </div>
                        </div>

                        {clusters.length > 0 && (
                            <div className="bg-white/70 rounded-xl shadow-sm p-4">
                                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                    Clustering Results
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-gray-700">
                                        <span className="font-medium">
                                            Total iterations:
                                        </span>{" "}
                                        {iterations}
                                    </p>
                                    {Array(k)
                                        .fill()
                                        .map((_, i) => {
                                            const count = clusters.filter(
                                                (p) => p.cluster === i
                                            ).length
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div
                                                        className="w-4 h-4 rounded-full"
                                                        style={{
                                                            backgroundColor: `hsl(${
                                                                ((i * 360) /
                                                                    k) %
                                                                360
                                                            }, 70%, 70%)`,
                                                        }}
                                                    ></div>
                                                    <span className="text-sm text-gray-700">
                                                        Cluster {i}: {count}{" "}
                                                        points
                                                    </span>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AlgorithmLayout>
    )
}

export default KMeans
