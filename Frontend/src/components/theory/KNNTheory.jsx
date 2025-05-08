import React from "react"
import "katex/dist/katex.min.css"
import { InlineMath, BlockMath } from "react-katex"

const KNNTheory = () => {
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
                K-Nearest Neighbors (KNN) Algorithm
            </h2>

            <div className="space-y-4 text-gray-700">
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        What is KNN?
                    </h3>
                    <p>
                        K-Nearest Neighbors is a simple, non-parametric
                        classification and regression algorithm that makes
                        predictions based on the k closest training examples in
                        the feature space. It's considered a "lazy learning"
                        algorithm because it doesn't build a model during
                        training - the "learning" happens at prediction time.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        How it Works
                    </h3>
                    <ol className="list-decimal pl-5 space-y-1">
                        <li>Store all training examples in memory</li>
                        <li>
                            Calculate the distance between the test example and
                            all training examples
                        </li>
                        <li>
                            Select the K-nearest examples (neighbors) to the
                            test example
                        </li>
                        <li>
                            Take a majority vote (for classification) or average
                            (for regression) of the K neighbors to make a
                            prediction
                        </li>
                    </ol>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Distance Calculation
                    </h3>
                    <p className="mb-2">
                        The most common distance metric used in KNN is the
                        Euclidean distance, which measures the straight-line
                        distance between two points in Euclidean space:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`d(\\mathbf{x}, \\mathbf{y}) = \\sqrt{\\sum_{i=1}^{n} (x_i - y_i)^2}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        For two points <InlineMath math="(x_1, x_2)" /> and{" "}
                        <InlineMath math="(y_1, y_2)" /> in 2D space (as in this
                        visualization):
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`d = \\sqrt{(x_1 - y_1)^2 + (x_2 - y_2)^2}`}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Making Predictions
                    </h3>
                    <p className="mb-2">
                        For classification, KNN uses majority voting among the K
                        neighbors:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\hat{y} = \\underset{c \\in C}{\\operatorname{arg\\,max}} \\sum_{i=1}^{k} \\mathbf{1}(y_i = c)`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        Where <InlineMath math="\hat{y}" /> is the predicted
                        class, <InlineMath math="C" /> is the set of all
                        possible classes,
                        <InlineMath math="y_i" /> is the class of the i-th
                        nearest neighbor, and <InlineMath math="\mathbf{1}()" />{" "}
                        is the indicator function.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Choosing the Value of K
                    </h3>
                    <p>The choice of K is critical in KNN:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            Small K: Model is more sensitive to noise but better
                            at capturing local patterns
                        </li>
                        <li>
                            Large K: Model is more stable but might miss
                            important local patterns
                        </li>
                        <li>
                            A common practice is to use K = sqrt(n), where n is
                            the number of training samples
                        </li>
                        <li>
                            K is typically an odd number to avoid ties in binary
                            classification
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
                                <li>No assumptions about data distribution</li>
                                <li>Works well with multi-class problems</li>
                                <li>
                                    Can be used for both classification and
                                    regression
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-red-700">
                                Limitations
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    Computationally expensive for large datasets
                                </li>
                                <li>Sensitive to irrelevant features</li>
                                <li>Sensitive to the scale of features</li>
                                <li>
                                    Requires feature selection or engineering
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KNNTheory
