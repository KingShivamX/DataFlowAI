import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"
import { useNavigate } from "react-router-dom"
import AlgorithmLayout from "./AlgorithmLayout"
import { motion } from "framer-motion"
import KMeansTheory from "../components/theory/KMeansTheory"

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
    const [inertia, setInertia] = useState(0)

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

    // Calculate inertia (sum of squared distances to nearest centroid)
    const calculateInertia = (clusteredPoints, centroids) => {
        if (!clusteredPoints.length || !centroids.length) return 0

        return clusteredPoints.reduce((sum, point) => {
            const centroid = centroids[point.cluster]
            const distance = calculateDistance(point, centroid)
            return sum + Math.pow(distance, 2)
        }, 0)
    }

    // Start clustering process
    const startClustering = async () => {
        if (isRunning || points.length < k) return

        setIsRunning(true)
        setIterations(0)

        try {
            // Initialize centroids
            const initialCentroids = Array(k)
                .fill()
                .map(() => ({
                    x: Math.random(),
                    y: Math.random(),
                }))
            setCentroids(initialCentroids)

            // Initial pause to show random centroids
            await new Promise((resolve) => setTimeout(resolve, 800))

            let currentCentroids = [...initialCentroids]
            let iterationCount = 0
            const MAX_ITERATIONS = 30

            while (iterationCount < MAX_ITERATIONS) {
                // Assign points to clusters
                const clusteredPoints = assignToClusters(
                    points,
                    currentCentroids
                )
                setClusters(clusteredPoints)

                // Pause to observe the clusters
                await new Promise((resolve) => setTimeout(resolve, 800))

                // Calculate new centroids
                const newCentroids = updateCentroids(clusteredPoints, k)

                // Animate centroid movement with interpolation steps
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

                // Check for convergence
                const hasConverged = currentCentroids.every(
                    (centroid, i) =>
                        calculateDistance(centroid, newCentroids[i]) < 0.00001
                )

                setIterations(iterationCount + 1)

                // Calculate inertia
                const currentInertia = calculateInertia(
                    clusteredPoints,
                    newCentroids
                )
                setInertia(currentInertia)

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

        // Create custom animation for centroids only
        Chart.defaults.datasets.scatter.animation = false

        const data = {
            datasets: [
                {
                    label: "Data Points",
                    data: points,
                    backgroundColor: clusters.length
                        ? clusters.map(
                              (p) =>
                                  `hsla(${
                                      ((p.cluster * 360) / k) % 360
                                  }, 80%, 65%, 0.8)`
                          )
                        : Array(points.length).fill("rgba(54, 162, 235, 0.7)"),
                    pointRadius: 8,
                    animation: false,
                },
                {
                    label: "Centroids",
                    data: centroids,
                    backgroundColor: Array(k)
                        .fill()
                        .map(
                            (_, i) =>
                                `hsla(${((i * 360) / k) % 360}, 80%, 50%, 0.9)`
                        ),
                    pointRadius: 12,
                    pointStyle: "triangle",
                    borderWidth: 2,
                    borderColor: Array(k)
                        .fill()
                        .map(
                            (_, i) =>
                                `hsla(${((i * 360) / k) % 360}, 90%, 30%, 0.8)`
                        ),
                    animation: {
                        duration: 0, // Set to 0 to make it follow setCentroids exactly
                    },
                },
            ],
        }

        chartInstance.current = new Chart(ctx, {
            type: "scatter",
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animations: {
                    colors: false,
                },
                datasets: {
                    scatter: {
                        animation: false,
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
                                const datasetIndex = context.datasetIndex
                                if (datasetIndex === 1) {
                                    // Centroids
                                    return `Centroid ${context.dataIndex}`
                                } else {
                                    // Data points
                                    return clusters.length
                                        ? `Point: (${point.x.toFixed(
                                              2
                                          )}, ${point.y.toFixed(
                                              2
                                          )}), Cluster: ${point.cluster}`
                                        : `Point: (${point.x.toFixed(
                                              2
                                          )}, ${point.y.toFixed(2)})`
                                }
                            },
                        },
                    },
                },
            },
        })
    }, [points, centroids, clusters, k])

    const handleClear = () => {
        if (isRunning) return
        setPoints([])
        setCentroids([])
        setClusters([])
        setIterations(0)
        setInertia(0)
    }

    // Generate random points following a pattern based on K value
    const generateRandomPoints = () => {
        if (isRunning) return
        const newPoints = []
        const numCenters = k // Use the current K value
        const numPointsPerCenter = 15

        // Create an array of cluster centers that are reasonably separated
        const centers = []

        // First center is always near bottom-left
        centers.push({
            x: 0.2 + Math.random() * 0.1,
            y: 0.2 + Math.random() * 0.1,
        })

        // Last center is always near top-right
        if (numCenters > 1) {
            centers.push({
                x: 0.7 + Math.random() * 0.1,
                y: 0.7 + Math.random() * 0.1,
            })
        }

        // Generate remaining centers with reasonable spacing
        if (numCenters > 2) {
            // Place centers in specific regions based on K value
            const regions = [
                { x: 0.2, y: 0.7 }, // top-left
                { x: 0.7, y: 0.2 }, // bottom-right
                { x: 0.5, y: 0.5 }, // center
                { x: 0.3, y: 0.4 }, // mid-left
                { x: 0.7, y: 0.5 }, // mid-right
                { x: 0.5, y: 0.8 }, // top-center
            ]

            // Add centers from predefined regions
            for (let i = 0; i < numCenters - 2 && i < regions.length; i++) {
                centers.push({
                    x: regions[i].x + (Math.random() - 0.5) * 0.1,
                    y: regions[i].y + (Math.random() - 0.5) * 0.1,
                })
            }
        }

        // Generate points around each center
        centers.forEach((center, centerIndex) => {
            for (let j = 0; j < numPointsPerCenter; j++) {
                // Add some gaussian-like noise
                const angle = Math.random() * 2 * Math.PI
                const radius = Math.random() * 0.12 // Smaller radius to make clusters more distinct
                const x = Math.max(
                    0,
                    Math.min(1, center.x + radius * Math.cos(angle))
                )
                const y = Math.max(
                    0,
                    Math.min(1, center.y + radius * Math.sin(angle))
                )
                newPoints.push({ x, y })
            }
        })

        setPoints(newPoints)
        setCentroids([])
        setClusters([])
        setIterations(0)
        setInertia(0)
    }

    return (
        <AlgorithmLayout title="K-Means Clustering">
            <div className="px-2 sm:px-4">
                <div className="mb-5">
                    <p className="text-gray-700 mb-3">
                        K-Means clustering groups similar data points together.
                        Add points to the canvas, set the number of clusters
                        (K), and then run the algorithm to watch the clustering
                        process.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4 items-center">
                        <div className="flex items-center gap-2">
                            <label htmlFor="kValue" className="text-gray-700">
                                Clusters (K):
                            </label>
                            <input
                                type="range"
                                id="kValue"
                                min="2"
                                max="8"
                                value={k}
                                onChange={(e) => setK(Number(e.target.value))}
                                className="w-24"
                                disabled={isRunning}
                            />
                            <span className="text-gray-700 min-w-[20px]">
                                {k}
                            </span>
                        </div>

                        <button
                            onClick={startClustering}
                            disabled={isRunning || points.length < k}
                            className={`px-4 py-2 rounded-lg ${
                                isRunning || points.length < k
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                        >
                            {isRunning ? "Clustering..." : "Start Clustering"}
                        </button>

                        <button
                            onClick={generateRandomPoints}
                            disabled={isRunning}
                            className={`px-4 py-2 rounded-lg ${
                                isRunning
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-amber-400 text-amber-900 hover:bg-amber-500"
                            }`}
                        >
                            Generate Random Points
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
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <div className="lg:col-span-3 bg-white/95 rounded-xl shadow-md border border-amber-200 overflow-hidden">
                        <div
                            className="w-full h-[520px] relative"
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
                                <li>Adjust the number of clusters (K)</li>
                                <li>
                                    Click &apos;Start Clustering&apos; to begin
                                </li>
                                <li>Watch as centroids and clusters update</li>
                                <li>Lower inertia means better clustering</li>
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
                                        Clusters (K):
                                    </span>
                                    <span className="font-bold bg-blue-200 px-2 py-0.5 rounded-md">
                                        {k}
                                    </span>
                                </p>
                                <p
                                    className={`${
                                        isRunning
                                            ? "text-blue-900 bg-blue-200/90"
                                            : "text-blue-900 bg-blue-100/80"
                                    } rounded-md px-3 py-1 flex justify-between items-center ${
                                        isRunning ? "animate-pulse" : ""
                                    }`}
                                >
                                    <span className="font-medium">
                                        Iterations:
                                    </span>
                                    <span
                                        className={`font-bold ${
                                            isRunning
                                                ? "bg-blue-300"
                                                : "bg-blue-200"
                                        } px-2 py-0.5 rounded-md`}
                                    >
                                        {iterations}
                                    </span>
                                </p>
                                {iterations > 0 && (
                                    <p className="text-blue-900 bg-blue-100/80 rounded-md px-3 py-1 flex justify-between items-center">
                                        <span className="font-medium">
                                            Inertia:
                                        </span>
                                        <span className="font-bold bg-blue-200 px-2 py-0.5 rounded-md">
                                            {inertia.toFixed(4)}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {clusters.length > 0 && (
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md border-2 border-purple-200 p-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-200/50 rounded-bl-full"></div>
                                <h3 className="text-lg font-bold mb-3 text-purple-800 border-b-2 border-purple-200 pb-1 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-purple-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                    </svg>
                                    Cluster Statistics
                                </h3>
                                <div className="space-y-2 relative z-10">
                                    {Array(k)
                                        .fill()
                                        .map((_, i) => {
                                            const clusterPoints =
                                                clusters.filter(
                                                    (p) => p.cluster === i
                                                )
                                            const clusterColor = `hsl(${
                                                ((i * 360) / k) % 360
                                            }, 80%, 40%)`
                                            return (
                                                <div
                                                    key={i}
                                                    className="mb-2 bg-white/50 rounded-md p-2 border-l-4"
                                                    style={{
                                                        borderColor:
                                                            clusterColor,
                                                    }}
                                                >
                                                    <p
                                                        className="font-medium"
                                                        style={{
                                                            color: clusterColor,
                                                        }}
                                                    >
                                                        Cluster {i}
                                                    </p>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <span className="text-sm text-gray-700">
                                                            Points:
                                                        </span>
                                                        <span className="font-bold text-sm px-2 py-0.5 rounded bg-white/80">
                                                            {
                                                                clusterPoints.length
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <KMeansTheory />
            </div>
        </AlgorithmLayout>
    )
}

export default KMeans
