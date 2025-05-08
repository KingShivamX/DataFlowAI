import React from "react"
import { InlineMath, BlockMath } from "react-katex"

const LinearRegressionTheory = () => {
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
                Linear Regression Algorithm
            </h2>

            <div className="space-y-4 text-gray-700 text-lg">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        What is Linear Regression?
                    </h3>
                    <p>
                        <strong>Linear Regression</strong> predicts a continuous
                        target variable based on predictor variables by fitting
                        a <strong>linear equation</strong> to observed data.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        The Linear Model
                    </h3>
                    <p className="mb-2">
                        <strong>Simple linear regression:</strong>
                    </p>
                    <div className="bg-amber-100 p-3 rounded-md overflow-x-auto border-l-4 border-amber-500">
                        <div className="min-w-fit">
                            <BlockMath math={`y = mx + b`} />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="y" /> = predicted value (dependent
                            variable or target)
                        </li>
                        <li>
                            <InlineMath math="x" /> = input feature (independent
                            variable or predictor)
                        </li>
                        <li>
                            <InlineMath math="m" /> = slope coefficient (how
                            much y changes when x increases by 1)
                        </li>
                        <li>
                            <InlineMath math="b" /> = y-intercept (value of y
                            when x = 0)
                        </li>
                    </ul>

                    <p className="mt-2">
                        <strong>Multiple linear regression:</strong>
                    </p>
                    <div className="bg-amber-100 p-3 rounded-md overflow-x-auto border-l-4 border-amber-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + ... + \\beta_n x_n`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="y" /> = predicted value
                        </li>
                        <li>
                            <InlineMath math="x_1, x_2, ..., x_n" /> = multiple
                            input features
                        </li>
                        <li>
                            <InlineMath math="\beta_0" /> = intercept (bias
                            term)
                        </li>
                        <li>
                            <InlineMath math="\beta_1, \beta_2, ..., \beta_n" />{" "}
                            = coefficients for each feature
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Ordinary Least Squares (OLS)
                    </h3>
                    <p className="mb-2">
                        <strong>Goal:</strong> Minimize sum of squared
                        differences:
                    </p>
                    <div className="bg-blue-50 p-3 rounded-md overflow-x-auto border-l-4 border-blue-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\text{minimize } \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="y_i" /> = actual value for ith
                            observation
                        </li>
                        <li>
                            <InlineMath math="\hat{y}_i" /> = predicted value
                            for ith observation
                        </li>
                        <li>
                            <InlineMath math="n" /> = number of observations in
                            dataset
                        </li>
                        <li>
                            <InlineMath math="(y_i - \hat{y}_i)^2" /> = squared
                            error for ith observation
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Evaluating the Model
                    </h3>

                    <h4 className="font-bold text-gray-800 mt-2">
                        R-squared (Coefficient of Determination)
                    </h4>
                    <div className="bg-green-50 p-3 rounded-md overflow-x-auto border-l-4 border-green-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`R^2 = 1 - \\frac{\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2}{\\sum_{i=1}^{n} (y_i - \\bar{y})^2}`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="R^2" /> = proportion of variance
                            explained by the model (0 to 1)
                        </li>
                        <li>
                            <InlineMath math="y_i" /> = actual value for ith
                            observation
                        </li>
                        <li>
                            <InlineMath math="\hat{y}_i" /> = predicted value
                            for ith observation
                        </li>
                        <li>
                            <InlineMath math="\bar{y}" /> = mean of all actual
                            values
                        </li>
                        <li>Numerator = sum of squared errors (SSE)</li>
                        <li>Denominator = total sum of squares (SST)</li>
                    </ul>

                    <h4 className="font-bold text-gray-800 mt-2">
                        Mean Squared Error (MSE)
                    </h4>
                    <div className="bg-green-50 p-3 rounded-md overflow-x-auto border-l-4 border-green-500">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\text{MSE} = \\frac{1}{n}\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        <strong>Formula explanation:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="\text{MSE}" /> = average squared
                            difference between predicted and actual values
                        </li>
                        <li>
                            <InlineMath math="n" /> = number of observations
                        </li>
                        <li>
                            <InlineMath math="y_i" /> = actual value for ith
                            observation
                        </li>
                        <li>
                            <InlineMath math="\hat{y}_i" /> = predicted value
                            for ith observation
                        </li>
                        <li>
                            Lower MSE values indicate better model performance
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
                                    <strong>Simple</strong> to understand
                                </li>
                                <li>
                                    <strong>Efficient</strong> computation
                                </li>
                                <li>
                                    <strong>Interpretable</strong> coefficients
                                </li>
                                <li>
                                    Works well for <strong>linear data</strong>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-red-700">
                                ✗ Limitations
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    Assumes <strong>linear relationship</strong>
                                </li>
                                <li>
                                    Sensitive to <strong>outliers</strong>
                                </li>
                                <li>
                                    Can't model{" "}
                                    <strong>complex relationships</strong>
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
                            <strong>Sales</strong> forecasting
                        </li>
                        <li>
                            <strong>Risk</strong> assessment
                        </li>
                        <li>
                            <strong>Real estate</strong> pricing
                        </li>
                        <li>
                            <strong>Trend</strong> analysis
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LinearRegressionTheory
