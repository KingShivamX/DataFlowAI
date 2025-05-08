import React from "react"
import { InlineMath, BlockMath } from "react-katex"

const LogisticRegressionTheory = () => {
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
                Logistic Regression Algorithm
            </h2>

            <div className="space-y-4 text-gray-700">
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        What is Logistic Regression?
                    </h3>
                    <p>
                        Logistic Regression is a supervised machine learning
                        algorithm used for binary classification problems.
                        Despite its name, it's a classification algorithm, not a
                        regression algorithm. It predicts the probability that
                        an instance belongs to a particular class.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        The Sigmoid Function
                    </h3>
                    <p className="mb-2">
                        At the core of logistic regression is the sigmoid
                        (logistic) function, which maps any real value to a
                        value between 0 and 1:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\sigma(z) = \\frac{1}{1 + e^{-z}}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        This function creates an S-shaped curve that can take
                        any real-valued number and map it into a value between 0
                        and 1.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        The Model
                    </h3>
                    <p className="mb-2">
                        In logistic regression, we model the probability that an
                        input belongs to the default class (class 1):
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`P(y=1|\\mathbf{x}) = \\sigma(\\mathbf{w}^T\\mathbf{x} + b) = \\frac{1}{1 + e^{-(\\mathbf{w}^T\\mathbf{x} + b)}}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">Where:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="\mathbf{x}" /> is the feature
                            vector
                        </li>
                        <li>
                            <InlineMath math="\mathbf{w}" /> is the weight
                            vector
                        </li>
                        <li>
                            <InlineMath math="b" /> is the bias term
                        </li>
                        <li>
                            <InlineMath math="\mathbf{w}^T\mathbf{x} + b" /> is
                            the linear combination of weights and features
                            (often denoted as z)
                        </li>
                    </ul>

                    <p className="mt-2">
                        For binary classification with features{" "}
                        <InlineMath math="x_1" /> and <InlineMath math="x_2" />{" "}
                        (as in our visualization):
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`P(y=1|x_1, x_2) = \\frac{1}{1 + e^{-(w_1 x_1 + w_2 x_2 + b)}}`}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Decision Boundary
                    </h3>
                    <p className="mb-2">
                        The decision boundary is where the model predicts equal
                        probability for both classes (P = 0.5). This occurs
                        when:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\mathbf{w}^T\\mathbf{x} + b = 0`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        For a 2D feature space, this creates a line. In higher
                        dimensions, it creates a hyperplane. For our
                        visualization with features <InlineMath math="x_1" />{" "}
                        and <InlineMath math="x_2" />:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath math={`w_1 x_1 + w_2 x_2 + b = 0`} />
                        </div>
                        <div className="min-w-fit mt-3">
                            <BlockMath
                                math={`x_2 = -\\frac{w_1}{w_2}x_1 - \\frac{b}{w_2}`}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Cost Function: Log Loss
                    </h3>
                    <p className="mb-2">
                        Logistic regression uses the log loss (binary
                        cross-entropy) as its cost function:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`J(\\mathbf{w}, b) = -\\frac{1}{m} \\sum_{i=1}^{m} [y^{(i)}\\log(\\hat{y}^{(i)}) + (1-y^{(i)})\\log(1-\\hat{y}^{(i)}))]`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">Where:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="m" /> is the number of training
                            examples
                        </li>
                        <li>
                            <InlineMath math="y^{(i)}" /> is the actual class (0
                            or 1) of the i-th example
                        </li>
                        <li>
                            <InlineMath math="\hat{y}^{(i)}" /> is the predicted
                            probability that the i-th example belongs to class 1
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Gradient Descent
                    </h3>
                    <p className="mb-2">
                        The weights are updated using gradient descent to
                        minimize the cost function:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md space-y-3 overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\frac{\\partial J}{\\partial w_j} = \\frac{1}{m} \\sum_{i=1}^{m} (\\hat{y}^{(i)} - y^{(i)}) x_j^{(i)}`}
                            />
                        </div>
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\frac{\\partial J}{\\partial b} = \\frac{1}{m} \\sum_{i=1}^{m} (\\hat{y}^{(i)} - y^{(i)})`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">The update rules are:</p>
                    <div className="bg-amber-50 p-3 rounded-md space-y-3 overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`w_j := w_j - \\alpha \\frac{\\partial J}{\\partial w_j}`}
                            />
                        </div>
                        <div className="min-w-fit">
                            <BlockMath
                                math={`b := b - \\alpha \\frac{\\partial J}{\\partial b}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        Where <InlineMath math="\alpha" /> is the learning rate.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Evaluating the Model
                    </h3>
                    <p>
                        Common metrics to evaluate logistic regression models
                        include:
                    </p>

                    <h4 className="font-medium text-gray-800 mt-2">Accuracy</h4>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\text{Accuracy} = \\frac{\\text{TP} + \\text{TN}}{\\text{TP} + \\text{TN} + \\text{FP} + \\text{FN}}`}
                            />
                        </div>
                    </div>

                    <h4 className="font-medium text-gray-800 mt-2">
                        Precision
                    </h4>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}}`}
                            />
                        </div>
                    </div>

                    <h4 className="font-medium text-gray-800 mt-2">Recall</h4>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\text{Recall} = \\frac{\\text{TP}}{\\text{TP} + \\text{FN}}`}
                            />
                        </div>
                    </div>

                    <h4 className="font-medium text-gray-800 mt-2">F1 Score</h4>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\text{F1} = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}`}
                            />
                        </div>
                    </div>
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
                                <li>Simple to implement and interpret</li>
                                <li>Efficient training</li>
                                <li>Outputs well-calibrated probabilities</li>
                                <li>
                                    Less prone to overfitting in
                                    high-dimensional spaces
                                </li>
                                <li>
                                    No assumptions about feature distributions
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-red-700">
                                Limitations
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Assumes linear decision boundary</li>
                                <li>
                                    Can't solve non-linear problems without
                                    feature engineering
                                </li>
                                <li>
                                    May underperform with highly imbalanced
                                    datasets
                                </li>
                                <li>Sensitive to outliers</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Applications
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Spam detection</li>
                        <li>Credit risk assessment</li>
                        <li>Medical diagnosis</li>
                        <li>Customer churn prediction</li>
                        <li>Sentiment analysis</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LogisticRegressionTheory
