import React from "react"
import "katex/dist/katex.min.css"
import { InlineMath, BlockMath } from "react-katex"

const LinearRegressionTheory = () => {
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
                Linear Regression Algorithm
            </h2>

            <div className="space-y-4 text-gray-700">
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        What is Linear Regression?
                    </h3>
                    <p>
                        Linear Regression is a supervised machine learning
                        algorithm used to predict a continuous target variable
                        based on one or more predictor variables. It models the
                        relationship by fitting a linear equation to the
                        observed data.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        The Linear Model
                    </h3>
                    <p className="mb-2">
                        In simple linear regression (one predictor variable),
                        the model takes the form:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath math={`y = mx + b`} />
                        </div>
                    </div>
                    <p className="mt-2">Where:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            <InlineMath math="y" /> is the predicted value
                            (dependent variable)
                        </li>
                        <li>
                            <InlineMath math="x" /> is the predictor variable
                            (independent variable)
                        </li>
                        <li>
                            <InlineMath math="m" /> is the slope of the line
                            (coefficient)
                        </li>
                        <li>
                            <InlineMath math="b" /> is the y-intercept (bias
                            term)
                        </li>
                    </ul>

                    <p className="mt-2">
                        In multiple linear regression (multiple predictor
                        variables), the model is:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + ... + \\beta_n x_n`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">Or in vector notation:</p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`y = \\mathbf{X}\\boldsymbol{\\beta}`}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Objective: Ordinary Least Squares (OLS)
                    </h3>
                    <p className="mb-2">
                        Linear regression typically uses the Ordinary Least
                        Squares method to find the best-fitting line by
                        minimizing the sum of squared differences between
                        observed and predicted values:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\text{minimize } \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2`}
                            />
                        </div>
                    </div>
                    <p className="mt-2">
                        Where <InlineMath math="y_i" /> is the actual value and{" "}
                        <InlineMath math="\hat{y}_i" /> is the predicted value.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Calculating the Coefficients
                    </h3>
                    <p className="mb-2">
                        For simple linear regression, the slope and intercept
                        can be calculated as:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md space-y-3 overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`m = \\frac{\\sum_{i=1}^{n} (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum_{i=1}^{n} (x_i - \\bar{x})^2}`}
                            />
                        </div>
                        <div className="min-w-fit">
                            <BlockMath math={`b = \\bar{y} - m\\bar{x}`} />
                        </div>
                    </div>
                    <p className="mt-2">
                        Where <InlineMath math="\bar{x}" /> and{" "}
                        <InlineMath math="\bar{y}" /> are the means of x and y
                        values.
                    </p>

                    <p className="mt-2">
                        For multiple linear regression, the coefficients are
                        calculated using matrix operations:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\boldsymbol{\\beta} = (\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T\\mathbf{y}`}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Evaluating the Model
                    </h3>
                    <p>
                        Common metrics to evaluate linear regression models
                        include:
                    </p>

                    <h4 className="font-medium text-gray-800 mt-2">
                        R-squared (Coefficient of Determination)
                    </h4>
                    <p className="mb-2">
                        Measures the proportion of variance in the dependent
                        variable explained by the model:
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`R^2 = 1 - \\frac{\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2}{\\sum_{i=1}^{n} (y_i - \\bar{y})^2}`}
                            />
                        </div>
                    </div>

                    <h4 className="font-medium text-gray-800 mt-2">
                        Mean Squared Error (MSE)
                    </h4>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\text{MSE} = \\frac{1}{n}\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2`}
                            />
                        </div>
                    </div>

                    <h4 className="font-medium text-gray-800 mt-2">
                        Mean Absolute Error (MAE)
                    </h4>
                    <div className="bg-amber-50 p-3 rounded-md overflow-x-auto">
                        <div className="min-w-fit">
                            <BlockMath
                                math={`\\text{MAE} = \\frac{1}{n}\\sum_{i=1}^{n} |y_i - \\hat{y}_i|`}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Assumptions of Linear Regression
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            Linearity: The relationship between X and Y is
                            linear
                        </li>
                        <li>
                            Independence: Observations are independent of each
                            other
                        </li>
                        <li>Homoscedasticity: Constant variance in errors</li>
                        <li>Normality: Errors are normally distributed</li>
                        <li>
                            No multicollinearity: Predictor variables are not
                            highly correlated (for multiple regression)
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
                                <li>Computationally efficient</li>
                                <li>Provides interpretable coefficients</li>
                                <li>Works well for linearly separable data</li>
                                <li>Basis for many advanced techniques</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-red-700">
                                Limitations
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    Assumes linear relationship between
                                    variables
                                </li>
                                <li>Sensitive to outliers</li>
                                <li>
                                    Can't model complex, non-linear
                                    relationships
                                </li>
                                <li>Assumes independence of features</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                        Applications
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Sales forecasting</li>
                        <li>Risk assessment</li>
                        <li>Real estate price prediction</li>
                        <li>Trend analysis</li>
                        <li>Economics and finance</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LinearRegressionTheory
