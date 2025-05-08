import React from "react"
import { InlineMath, BlockMath } from "react-katex"

const KNNTheory = () => {
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
                K-Nearest Neighbors (KNN) Algorithm
            </h2>

            <div className="space-y-4 text-gray-700 text-lg">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        What is KNN?
                    </h3>
                    <p>
                        <strong>K-Nearest Neighbors</strong> is a{" "}
                        <strong>non-parametric algorithm</strong> that
                        classifies data based on the{" "}
                        <strong>k closest training examples</strong>. It's a
                        "lazy learning" algorithm - no training until prediction
                        time.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        How it Works
                    </h3>
                    <ol className="list-decimal pl-5 space-y-1">
                        <li>
                            <strong>Store</strong> all training examples
                        </li>
                        <li>
                            <strong>Calculate distance</strong> between test
                            example and all training examples
                        </li>
                        <li>
                            <strong>Select K-nearest</strong> examples to the
                            test point
                        </li>
                        <li>
                            Use <strong>majority vote</strong> (classification)
                            or <strong>average</strong> (regression) to predict
                        </li>
                    </ol>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Distance Calculation
                    </h3>
                    <p className="mb-2">
                        <strong>Euclidean distance</strong> is most commonly
                        used:
                    </p>
                    <div className="bg-teal-50 p-3 rounded-md overflow-x-auto border-l-4 border-teal-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`d(\\mathbf{x}, \\mathbf{y}) = \\sqrt{\\sum_{i=1}^{n} (x_i - y_i)^2}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="d(\mathbf{x}, \mathbf{y})" /> =
                            Euclidean distance between two points
                        </li>
                        <li>
                            <InlineMath math="\mathbf{x}, \mathbf{y}" /> = two
                            data points in n-dimensional space
                        </li>
                        <li>
                            <InlineMath math="x_i, y_i" /> = values of ith
                            feature for points x and y
                        </li>
                        <li>
                            <InlineMath math="n" /> = number of features
                            (dimensions)
                        </li>
                        <li>
                            Smaller distance values indicate points are closer
                            together
                        </li>
                    </ul>

                    <p className="mt-2">In 2D space:</p>
                    <div className="bg-teal-50 p-3 rounded-md overflow-x-auto border-l-4 border-teal-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`d = \\sqrt{(x_1 - y_1)^2 + (x_2 - y_2)^2}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="d" /> = Euclidean distance between
                            two 2D points
                        </li>
                        <li>
                            <InlineMath math="x_1, x_2" /> = x and y coordinates
                            of first point
                        </li>
                        <li>
                            <InlineMath math="y_1, y_2" /> = x and y coordinates
                            of second point
                        </li>
                        <li>
                            This is the 2D version of the Pythagorean theorem
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Making Predictions
                    </h3>
                    <p className="mb-2">
                        For classification, <strong>majority voting</strong>{" "}
                        among K neighbors:
                    </p>
                    <div className="bg-indigo-50 p-3 rounded-md overflow-x-auto border-l-4 border-indigo-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\hat{y} = \\underset{c \\in C}{\\operatorname{arg\\,max}} \\sum_{i=1}^{k} \\mathbf{1}(y_i = c)`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="\hat{y}" /> = predicted class for
                            the test example
                        </li>
                        <li>
                            <InlineMath math="C" /> = set of all possible class
                            labels
                        </li>
                        <li>
                            <InlineMath math="c" /> = a specific class label
                        </li>
                        <li>
                            <InlineMath math="y_i" /> = class label of the ith
                            nearest neighbor
                        </li>
                        <li>
                            <InlineMath math="k" /> = number of neighbors to
                            consider
                        </li>
                        <li>
                            <InlineMath math="\mathbf{1}(y_i = c)" /> =
                            indicator function: 1 if condition is true, 0 if
                            false
                        </li>
                        <li>
                            <InlineMath math="\text{arg\,max}" /> = returns the
                            class that maximizes the sum (most frequent class)
                        </li>
                    </ul>

                    <p className="mt-2 mb-2">
                        For regression, <strong>average</strong> of K neighbors:
                    </p>
                    <div className="bg-indigo-50 p-3 rounded-md overflow-x-auto border-l-4 border-indigo-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\hat{y} = \\frac{1}{k} \\sum_{i=1}^{k} y_i`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="\hat{y}" /> = predicted value for
                            the test example
                        </li>
                        <li>
                            <InlineMath math="y_i" /> = value of the ith nearest
                            neighbor
                        </li>
                        <li>
                            <InlineMath math="k" /> = number of neighbors to
                            consider
                        </li>
                        <li>
                            The prediction is simply the mean of the k nearest
                            neighbor values
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Choosing K Value
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-amber-50 p-3 rounded-md border-l-4 border-amber-500">
                            <p className="font-bold">Small K:</p>
                            <p>
                                Captures local patterns but sensitive to noise
                            </p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-md border-l-4 border-amber-500">
                            <p className="font-bold">Large K:</p>
                            <p>More stable but may miss local patterns</p>
                        </div>
                    </div>
                    <p className="mt-2 font-bold">
                        Common choice: K = √n (n = # of training samples)
                    </p>
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
                                    No data distribution{" "}
                                    <strong>assumptions</strong>
                                </li>
                                <li>
                                    Works with <strong>multi-class</strong>{" "}
                                    problems
                                </li>
                                <li>
                                    Both <strong>classification</strong> &{" "}
                                    <strong>regression</strong>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-red-700">
                                ✗ Limitations
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong>Slow</strong> for large datasets
                                </li>
                                <li>
                                    Sensitive to{" "}
                                    <strong>irrelevant features</strong>
                                </li>
                                <li>
                                    Sensitive to{" "}
                                    <strong>feature scaling</strong>
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
