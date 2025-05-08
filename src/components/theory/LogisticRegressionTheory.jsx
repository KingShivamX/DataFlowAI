import React from "react"
import { InlineMath, BlockMath } from "react-katex"

const LogisticRegressionTheory = () => {
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
                Logistic Regression Algorithm
            </h2>

            <div className="space-y-4 text-gray-700 text-lg">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        What is Logistic Regression?
                    </h3>
                    <p>
                        <strong>Logistic Regression</strong> is a{" "}
                        <strong>classification algorithm</strong> that predicts
                        the probability of an instance belonging to a particular
                        class.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        The Sigmoid Function
                    </h3>
                    <p className="mb-2">
                        Maps any real value to a value between 0 and 1:
                    </p>
                    <div className="bg-purple-50 p-3 rounded-md overflow-x-auto border-l-4 border-purple-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\sigma(z) = \\frac{1}{1 + e^{-z}}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="\sigma(z)" /> = sigmoid function
                            output (between 0 and 1)
                        </li>
                        <li>
                            <InlineMath math="z" /> = input value (linear
                            combination of features and weights)
                        </li>
                        <li>
                            <InlineMath math="e" /> = Euler's number
                            (approximately 2.718)
                        </li>
                        <li>
                            As <InlineMath math="z" /> approaches positive
                            infinity, <InlineMath math="\sigma(z)" /> approaches
                            1
                        </li>
                        <li>
                            As <InlineMath math="z" /> approaches negative
                            infinity, <InlineMath math="\sigma(z)" /> approaches
                            0
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        The Model
                    </h3>
                    <p className="mb-2">
                        Probability that input belongs to class 1:
                    </p>
                    <div className="bg-purple-50 p-3 rounded-md overflow-x-auto border-l-4 border-purple-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`P(y=1|\\mathbf{x}) = \\sigma(\\mathbf{w}^T\\mathbf{x} + b) = \\frac{1}{1 + e^{-(\\mathbf{w}^T\\mathbf{x} + b)}}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="P(y=1|\mathbf{x})" /> =
                            probability that the class is 1 given input features
                            x
                        </li>
                        <li>
                            <InlineMath math="\mathbf{x}" /> = feature vector
                            (input variables)
                        </li>
                        <li>
                            <InlineMath math="\mathbf{w}" /> = weight vector
                            (parameters to be learned)
                        </li>
                        <li>
                            <InlineMath math="b" /> = bias term (intercept)
                        </li>
                        <li>
                            <InlineMath math="\mathbf{w}^T\mathbf{x}" /> = dot
                            product of weight and feature vectors
                        </li>
                        <li>
                            <InlineMath math="\sigma()" /> = sigmoid function
                            that converts linear output to probability
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Decision Boundary
                    </h3>
                    <p className="mb-2">
                        The boundary where P = 0.5 (equal probability):
                    </p>
                    <div className="bg-purple-50 p-3 rounded-md overflow-x-auto border-l-4 border-purple-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\mathbf{w}^T\\mathbf{x} + b = 0`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="\mathbf{w}^T\mathbf{x} + b = 0" />{" "}
                            defines where probability equals 0.5
                        </li>
                        <li>
                            <InlineMath math="\mathbf{w}" /> = weight vector
                            (slope of boundary in each dimension)
                        </li>
                        <li>
                            <InlineMath math="\mathbf{x}" /> = feature vector
                            (coordinates in feature space)
                        </li>
                        <li>
                            <InlineMath math="b" /> = bias term (shifts boundary
                            from origin)
                        </li>
                        <li>
                            Points where{" "}
                            <InlineMath math="\mathbf{w}^T\mathbf{x} + b > 0" />{" "}
                            are classified as class 1
                        </li>
                        <li>
                            Points where{" "}
                            <InlineMath math="\mathbf{w}^T\mathbf{x} + b < 0" />{" "}
                            are classified as class 0
                        </li>
                    </ul>

                    <p className="mt-2">
                        For a 2D feature space (with <InlineMath math="x_1" />{" "}
                        and <InlineMath math="x_2" />
                        ):
                    </p>
                    <div className="bg-purple-50 p-3 rounded-md overflow-x-auto border-l-4 border-purple-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`x_2 = -\\frac{w_1}{w_2}x_1 - \\frac{b}{w_2}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="x_2" /> = second feature value
                            (y-coordinate in 2D feature space)
                        </li>
                        <li>
                            <InlineMath math="x_1" /> = first feature value
                            (x-coordinate in 2D feature space)
                        </li>
                        <li>
                            <InlineMath math="w_1" /> = weight for first feature
                            (affects slope of boundary line)
                        </li>
                        <li>
                            <InlineMath math="w_2" /> = weight for second
                            feature (affects slope of boundary line)
                        </li>
                        <li>
                            <InlineMath math="b" /> = bias term (affects
                            y-intercept of boundary line)
                        </li>
                        <li>
                            <InlineMath math="-\frac{w_1}{w_2}" /> = slope of
                            the decision boundary line
                        </li>
                        <li>
                            <InlineMath math="-\frac{b}{w_2}" /> = y-intercept
                            of the decision boundary line
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Cost Function: Log Loss
                    </h3>
                    <div className="bg-blue-50 p-3 rounded-md overflow-x-auto border-l-4 border-blue-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`J(\\mathbf{w}, b) = -\\frac{1}{m} \\sum_{i=1}^{m} [y^{(i)}\\log(\\hat{y}^{(i)}) + (1-y^{(i)})\\log(1-\\hat{y}^{(i)}))]`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="J(\mathbf{w}, b)" /> = cost
                            function to be minimized
                        </li>
                        <li>
                            <InlineMath math="m" /> = number of training
                            examples
                        </li>
                        <li>
                            <InlineMath math="y^{(i)}" /> = actual class label
                            (0 or 1) for ith example
                        </li>
                        <li>
                            <InlineMath math="\hat{y}^{(i)}" /> = predicted
                            probability that ith example belongs to class 1
                        </li>
                        <li>
                            <InlineMath math="\log()" /> = natural logarithm
                        </li>
                        <li>
                            First term penalizes incorrect predictions when
                            actual class is 1
                        </li>
                        <li>
                            Second term penalizes incorrect predictions when
                            actual class is 0
                        </li>
                        <li>Also known as binary cross-entropy loss</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Evaluating the Model
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-bold text-gray-800 mt-2">
                                Accuracy
                            </h4>
                            <div className="bg-green-50 p-3 rounded-md overflow-x-auto border-l-4 border-green-500">
                                <div className="min-w-fit">
                                    <BlockMath
                                        math={`\\text{Accuracy} = \\frac{\\text{TP} + \\text{TN}}{\\text{TP} + \\text{TN} + \\text{FP} + \\text{FN}}`}
                                    />
                                </div>
                            </div>
                            <p className="mt-2">
                                <strong>Formula explanation:</strong>
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>
                                    <InlineMath math="\text{TP}" /> = True
                                    Positives (correctly predicted class 1)
                                </li>
                                <li>
                                    <InlineMath math="\text{TN}" /> = True
                                    Negatives (correctly predicted class 0)
                                </li>
                                <li>
                                    <InlineMath math="\text{FP}" /> = False
                                    Positives (predicted class 1, actually class
                                    0)
                                </li>
                                <li>
                                    <InlineMath math="\text{FN}" /> = False
                                    Negatives (predicted class 0, actually class
                                    1)
                                </li>
                                <li>
                                    Measures overall correctness of predictions
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-800 mt-2">
                                F1 Score
                            </h4>
                            <div className="bg-green-50 p-3 rounded-md overflow-x-auto border-l-4 border-green-500">
                                <div className="min-w-fit">
                                    <BlockMath
                                        math={`\\text{F1} = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}`}
                                    />
                                </div>
                            </div>
                            <p className="mt-2">
                                <strong>Formula explanation:</strong>
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>
                                    <InlineMath math="\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}" />{" "}
                                    (positive predictive value)
                                </li>
                                <li>
                                    <InlineMath math="\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}" />{" "}
                                    (true positive rate or sensitivity)
                                </li>
                                <li>
                                    F1 is the harmonic mean of precision and
                                    recall
                                </li>
                                <li>Ranges from 0 (worst) to 1 (best)</li>
                                <li>
                                    Useful for imbalanced datasets where
                                    accuracy can be misleading
                                </li>
                            </ul>
                        </div>
                    </div>
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
                                    <strong>Efficient</strong> training
                                </li>
                                <li>
                                    Outputs well-calibrated{" "}
                                    <strong>probabilities</strong>
                                </li>
                                <li>
                                    Less prone to <strong>overfitting</strong>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-red-700">
                                ✗ Limitations
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    Assumes <strong>linear boundary</strong>
                                </li>
                                <li>
                                    Can't solve{" "}
                                    <strong>non-linear problems</strong>{" "}
                                    directly
                                </li>
                                <li>
                                    Sensitive to <strong>outliers</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Applications
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 grid grid-cols-2">
                        <li>
                            <strong>Spam</strong> detection
                        </li>
                        <li>
                            <strong>Credit risk</strong> assessment
                        </li>
                        <li>
                            <strong>Medical</strong> diagnosis
                        </li>
                        <li>
                            <strong>Sentiment</strong> analysis
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LogisticRegressionTheory
