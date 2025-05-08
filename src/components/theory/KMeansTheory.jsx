import React from "react"
import { InlineMath, BlockMath } from "react-katex"

const KMeansTheory = () => {
    return (
        <div className="bg-white/95 rounded-xl shadow-md border border-amber-200 p-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b border-amber-200 pb-2 flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-amber-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11a1 1 0 11-2 0 1 1 0 012 0zm-1-3a1 1 0 00-1 1v3a1 1 0 002 0V11a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
                K-Means Clustering Algorithm
            </h2>

            <div className="space-y-4 text-gray-700 text-lg">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        What is K-Means Clustering?
                    </h3>
                    <p>
                        <strong>K-Means</strong> is an{" "}
                        <strong>unsupervised learning</strong> algorithm that
                        groups similar data points into{" "}
                        <strong>K clusters</strong>. The "K" represents the
                        number of clusters specified before running the
                        algorithm.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        The Algorithm
                    </h3>
                    <ol className="list-decimal pl-5 space-y-1">
                        <li>
                            <strong>Initialize</strong> K centroids randomly
                        </li>
                        <li>
                            <strong>Assign</strong> each data point to the
                            nearest centroid
                        </li>
                        <li>
                            <strong>Update</strong> centroids as the mean of all
                            points in the cluster
                        </li>
                        <li>
                            <strong>Repeat</strong> steps 2-3 until centroids
                            stabilize or max iterations reached
                        </li>
                    </ol>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Distance Calculation
                    </h3>
                    <p className="mb-2">Most commonly Euclidean distance:</p>
                    <div className="bg-purple-50 p-3 rounded-md overflow-x-auto border-l-4 border-purple-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`d(\\mathbf{x}, \\mathbf{c}) = \\sqrt{\\sum_{i=1}^{n} (x_i - c_i)^2}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="d(\mathbf{x}, \mathbf{c})" /> =
                            Euclidean distance between a data point and a
                            centroid
                        </li>
                        <li>
                            <InlineMath math="\mathbf{x}" /> = data point in
                            n-dimensional space
                        </li>
                        <li>
                            <InlineMath math="\mathbf{c}" /> = centroid in
                            n-dimensional space
                        </li>
                        <li>
                            <InlineMath math="x_i, c_i" /> = values of ith
                            feature for point x and centroid c
                        </li>
                        <li>
                            <InlineMath math="n" /> = number of features
                            (dimensions)
                        </li>
                        <li>
                            Used to assign each point to its nearest centroid
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Centroid Update
                    </h3>
                    <p className="mb-2">Each centroid is updated as:</p>
                    <div className="bg-purple-50 p-3 rounded-md overflow-x-auto border-l-4 border-purple-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\mathbf{c}_j = \\frac{1}{|S_j|} \\sum_{\\mathbf{x} \\in S_j} \\mathbf{x}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="\mathbf{c}_j" /> = centroid of
                            cluster j
                        </li>
                        <li>
                            <InlineMath math="S_j" /> = set of all data points
                            assigned to cluster j
                        </li>
                        <li>
                            <InlineMath math="|S_j|" /> = number of data points
                            in cluster j
                        </li>
                        <li>
                            <InlineMath math="\mathbf{x}" /> = data point in
                            cluster j
                        </li>
                        <li>
                            The new centroid is the mean (average) position of
                            all points in the cluster
                        </li>
                        <li>
                            Each feature/dimension is averaged independently
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Objective Function
                    </h3>
                    <p className="mb-2">
                        <strong>Inertia</strong> (Sum of squared distances to
                        centroids):
                    </p>
                    <div className="bg-blue-50 p-3 rounded-md overflow-x-auto border-l-4 border-blue-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`J = \\sum_{j=1}^{k} \\sum_{\\mathbf{x} \\in S_j} ||\\mathbf{x} - \\mathbf{c}_j||^2`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="J" /> = inertia (objective
                            function to minimize)
                        </li>
                        <li>
                            <InlineMath math="k" /> = number of clusters
                        </li>
                        <li>
                            <InlineMath math="S_j" /> = set of data points in
                            cluster j
                        </li>
                        <li>
                            <InlineMath math="\mathbf{x}" /> = data point
                        </li>
                        <li>
                            <InlineMath math="\mathbf{c}_j" /> = centroid of
                            cluster j
                        </li>
                        <li>
                            <InlineMath math="||\mathbf{x} - \mathbf{c}_j||^2" />{" "}
                            = squared Euclidean distance between point x and
                            centroid j
                        </li>
                        <li>
                            <strong>
                                Lower inertia means better clustering
                            </strong>{" "}
                            (more compact clusters)
                        </li>
                        <li>K-means algorithm tries to minimize this value</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Choosing the Optimal K
                    </h3>
                    <p className="mb-2">
                        The Elbow Method looks for the "elbow" in the inertia
                        curve:
                    </p>
                    <div className="bg-green-50 p-3 rounded-md overflow-x-auto border-l-4 border-green-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\text{Plot } J_k \\text{ for different values of } k`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="J_k" /> = inertia value when using
                            k clusters
                        </li>
                        <li>Plot inertia (y-axis) against k values (x-axis)</li>
                        <li>
                            Look for the point where inertia reduction slows
                            down (the "elbow")
                        </li>
                        <li>
                            This point represents a good balance between model
                            complexity and fit
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Advantages & Limitations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-bold text-green-700">
                                ✓ Advantages
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong>Simple</strong> to implement
                                </li>
                                <li>
                                    <strong>Fast</strong> for large datasets
                                </li>
                                <li>
                                    <strong>Scales</strong> to high dimensions
                                </li>
                                <li>
                                    <strong>Interpretable</strong> results
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-red-700">
                                ✗ Limitations
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    Must specify <strong>K in advance</strong>
                                </li>
                                <li>
                                    Sensitive to <strong>initialization</strong>
                                </li>
                                <li>
                                    Assumes <strong>spherical clusters</strong>
                                </li>
                                <li>
                                    Can find <strong>local optima</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        K-Means++
                    </h3>
                    <p>
                        An improved initialization method that selects initial
                        centroids:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1">
                        <li>Choose first centroid randomly</li>
                        <li>
                            Select subsequent centroids with probability
                            proportional to their squared distance from the
                            closest existing centroid
                        </li>
                        <li>Leads to better and more consistent results</li>
                    </ol>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Applications
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 grid grid-cols-1 md:grid-cols-2">
                        <li>
                            <strong>Customer segmentation</strong> for marketing
                        </li>
                        <li>
                            <strong>Image compression</strong> (color
                            quantization)
                        </li>
                        <li>
                            <strong>Document clustering</strong> in text
                            analysis
                        </li>
                        <li>
                            <strong>Anomaly detection</strong> in datasets
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default KMeansTheory
