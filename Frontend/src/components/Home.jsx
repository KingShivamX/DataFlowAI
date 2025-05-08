import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const Home = () => {
    const navigate = useNavigate()

    const algorithms = [
        {
            path: "/linear-regression",
            name: "Linear Regression",
            description:
                "Predict continuous values by finding the best-fitting line through data points.",
            icon: "📈",
            color: "from-yellow-400 to-amber-400",
        },
        {
            path: "/logistic-regression",
            name: "Logistic Regression",
            description:
                "Classify data into two categories using a probability-based approach.",
            icon: "🎯",
            color: "from-amber-500 to-orange-400",
        },
        {
            path: "/knn",
            name: "K-Nearest Neighbors",
            description:
                "Classify points based on their closest neighbors in the feature space.",
            icon: "🎲",
            color: "from-orange-400 to-orange-500",
        },
        {
            path: "/kmeans",
            name: "K-Means Clustering",
            description:
                "Group similar data points together into clusters automatically.",
            icon: "🎨",
            color: "from-yellow-500 to-yellow-600",
        },
    ]

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    }

    return (
        <motion.div
            className="min-h-[100vh] pt-20 pb-12 bg-gradient-to-br from-yellow-50/80 via-amber-50/60 to-amber-50/80 bg-fixed"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Hero Section */}
            <motion.section
                variants={itemVariants}
                className="relative overflow-hidden py-12 md:py-20 mb-12"
            >
                <div className="container mx-auto px-4 md:px-8 lg:px-10 relative z-10 pt-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.h1
                            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                                Visualize & Learn
                            </span>
                            <br />
                            <span className="text-gray-800">
                                Machine Learning
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            Interactive visualizations making complex algorithms
                            easy to understand.
                            <span className="hidden md:inline">
                                {" "}
                                Learn by doing and seeing how they work in
                                real-time.
                            </span>
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <button
                                onClick={() => navigate("/linear-regression")}
                                className="px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Get Started
                            </button>
                            <button
                                onClick={() => navigate("/about")}
                                className="px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base bg-white text-gray-800 rounded-full font-medium border border-amber-200 shadow hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Learn More
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Animated background elements */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
            </motion.section>

            {/* Info Section */}
            <motion.section
                variants={itemVariants}
                className="py-12 md:py-20 bg-white/30 backdrop-blur-sm rounded-3xl mx-4 md:mx-8 lg:mx-10 shadow-sm"
            >
                <div className="container mx-auto px-4 md:px-8 lg:px-10">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-center max-w-7xl mx-auto">
                        <div className="w-full lg:w-5/12">
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                What is Machine Learning?
                            </motion.h2>
                            <motion.div
                                className="space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Machine Learning is teaching computers to
                                    learn from data, just like we learn from
                                    experience. Instead of writing strict rules,
                                    we show the computer lots of examples, and
                                    it figures out the patterns by itself.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Through mathematical algorithms and
                                    statistical models, it can make predictions
                                    and uncover hidden insights from complex
                                    datasets, enabling computers to make
                                    decisions without explicit programming.
                                </p>
                            </motion.div>
                        </div>
                        <div className="w-full lg:w-5/12 flex lg:justify-end">
                            <motion.div
                                className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <img
                                    src="/homepagegif.webp"
                                    alt="Machine Learning Visualization"
                                    className="w-full rounded-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                                    <div className="p-6">
                                        <p className="text-white text-sm md:text-base">
                                            Brain neurons
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Algorithms Grid */}
            <motion.section
                variants={itemVariants}
                className="py-12 md:py-20 bg-white/30 backdrop-blur-sm rounded-3xl mx-4 md:mx-8 lg:mx-10 mt-12 shadow-sm"
            >
                <div className="container mx-auto px-4 md:px-8 lg:px-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                Explore Our Algorithms
                            </motion.h2>
                            <motion.p
                                className="text-lg text-gray-600 max-w-3xl mx-auto"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Interactive visualizations to help you
                                understand how each algorithm works
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {algorithms.map((algo, index) => (
                                <motion.div
                                    key={algo.path}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    whileHover={{ y: -5 }}
                                    onClick={() => navigate(algo.path)}
                                    className="bg-white/70 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-amber-100 overflow-hidden"
                                >
                                    <div className="flex flex-col h-full">
                                        <div
                                            className={`bg-gradient-to-r ${algo.color} h-3`}
                                        ></div>
                                        <div className="p-6 flex items-center gap-6 h-full">
                                            <div
                                                className={`bg-gradient-to-br ${algo.color} w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-3xl shadow-lg`}
                                            >
                                                {algo.icon}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                    {algo.name}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {algo.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                variants={itemVariants}
                className="py-16 md:py-20 pb-0 mt-12"
            >
                <div className="container mx-auto px-4 md:px-8 lg:px-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <svg
                                    className="h-full w-full"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M0 100 L100 0 L100 100 Z"
                                        fill="white"
                                    ></path>
                                </svg>
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-center md:text-left">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                        Ready to get started?
                                    </h2>
                                    <p className="text-lg text-amber-100 max-w-xl">
                                        Dive into the world of machine learning
                                        with our interactive visualizations. No
                                        coding experience required!
                                    </p>
                                </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            navigate("/linear-regression")
                                        }
                                        className="px-6 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-base bg-white text-amber-600 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                    >
                                        Start Learning
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </motion.div>
    )
}

export default Home
