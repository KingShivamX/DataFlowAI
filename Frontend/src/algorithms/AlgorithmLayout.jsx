import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const AlgorithmLayout = ({ children, title }) => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50/80 via-amber-50/60 to-amber-50/80 bg-fixed">
            {/* Back Button */}
            <div className="absolute top-6 left-6 z-10">
                <motion.button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-amber-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    <span className="text-gray-700 font-medium">
                        Back to Home
                    </span>
                </motion.button>
            </div>

            {/* Algorithm Title */}
            {title && (
                <div className="pt-20 pb-6 text-center">
                    <motion.h1
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-500 bg-clip-text text-transparent inline-block"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {title}
                    </motion.h1>
                </div>
            )}

            {/* Algorithm Content */}
            <div className="container mx-auto px-4 pb-12">{children}</div>
        </div>
    )
}

export default AlgorithmLayout
