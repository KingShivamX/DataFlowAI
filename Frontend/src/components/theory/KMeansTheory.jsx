import React from "react"
import "katex/dist/katex.min.css"
import { InlineMath, BlockMath } from "react-katex"

const KMeansTheory = () => {
    return (
        <div className="bg-white/95 rounded-xl shadow-md border border-amber-200 p-4 mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-amber-200 pb-2 flex items-center">
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

            <div className="space-y-4 text-gray-700">
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        What is K-Means Clustering?
                    </h3>
                    <p>
                        K-Means is an unsupervised machine learning algorithm
                        that groups similar data points together into K
                        clusters. It aims to partition observations into
                        clusters where each observation belongs to the cluster
                        with the nearest mean (cluster centroid).
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        The Algorithm
                    </h3>
                    <ol className="list-decimal pl-5 space-y-1">
                        <li>Initialize K cluster centroids randomly</li>
                        <li>
                            Assign each data point to the nearest centroid,
                            forming K clusters
                        </li>
                        <li>
                            Recalculate the centroids as the mean of all points
                            in each cluster
                        </li>
                        <li>
                            Repeat steps 2-3 until centroids no longer move
                            significantly or a maximum number of iterations is
                            reached
                        </li>
                    </ol>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Mathematical Formulation
                    </h3>
                    <p className="mb-2">
                        K-Means aims to minimize the within-cluster sum of
                        squares (WCSS), also known as inertia:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`J = \\sum_{j=1}^{k} \\sum_{i=1}^{n} \\| x_i^{(j)} - c_j \\|^2`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">Where:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="J" /> is the objective function
                            (inertia) to minimize
                        </li>
                        <li>
                            <InlineMath math="k" /> is the number of clusters
                        </li>
                        <li>
                            <InlineMath math="n" /> is the number of data points
                        </li>
                        <li>
                            <InlineMath math="x_i^{(j)}" /> is the i-th data
                            point belonging to cluster j
                        </li>
                        <li>
                            <InlineMath math="c_j" /> is the centroid of cluster
                            j
                        </li>
                        <li>
                            <InlineMath math="\| x_i^{(j)} - c_j \|^2" /> is the
                            squared Euclidean distance between data point and
                            centroid
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Cluster Assignment Step
                    </h3>
                    <p className="mb-2">
                        Each data point is assigned to the cluster with the
                        nearest centroid:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`S_j^{(t)} = \\{x_i : \\|x_i - c_j^{(t)}\\|^2 \\leq \\|x_i - c_l^{(t)}\\|^2 \\; \\forall \\, l, 1 \\leq l \\leq k\\}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        Where <InlineMath math="S_j^{(t)}" /> is the set of
                        points assigned to cluster j at iteration t.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Centroid Update Step
                    </h3>
                    <p className="mb-2">
                        Each centroid is updated to be the mean of all points
                        assigned to its cluster:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`c_j^{(t+1)} = \\frac{1}{|S_j^{(t)}|} \\sum_{x_i \\in S_j^{(t)}} x_i`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        Where <InlineMath math="|S_j^{(t)}|" /> is the number of
                        points in cluster j at iteration t.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Choosing the Optimal K
                    </h3>
                    <p>
                        Determining the optimal number of clusters (K) is a
                        critical step. Common methods include:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            Elbow Method: Plot inertia vs K and look for the
                            "elbow" point
                        </li>
                        <li>
                            Silhouette Analysis: Measure how similar objects are
                            to their own cluster compared to other clusters
                        </li>
                        <li>
                            Gap Statistic: Compare inertia with that of a
                            reference null distribution
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Advantages and Limitations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium text-green-700">
                                Advantages
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Simple to understand and implement</li>
                                <li>Scales well to large datasets</li>
                                <li>Guarantees convergence</li>
                                <li>
                                    Works well when clusters are spherical and
                                    similar in size
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-red-700">
                                Limitations
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Requires specifying K in advance</li>
                                <li>Sensitive to initial centroid placement</li>
                                <li>Struggles with non-spherical clusters</li>
                                <li>Sensitive to outliers</li>
                                <li>May converge to local optima</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Applications
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Customer segmentation</li>
                        <li>Image compression</li>
                        <li>Document clustering</li>
                        <li>Anomaly detection</li>
                        <li>Feature engineering</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default KMeansTheory
