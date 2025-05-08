import { motion } from "framer-motion"

const About = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.5,
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

    const technologies = [
        "React",
        "TensorFlow.js",
        "Chart.js",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "MongoDB",
        "Framer Motion",
    ]

    return (
        <motion.div
            className="min-h-[84vh] bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-50 py-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="container mx-auto px-4 md:px-8 max-w-7xl pt-18 md:pt-24">
                {/* Hero Section */}
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                        About DataFlowAI
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Our mission is to make machine learning concepts
                        accessible to everyone through interactive, visual
                        explanations.
                    </p>
                </motion.div>

                {/* Project Overview */}
                <motion.section variants={itemVariants} className="mb-16">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b border-amber-100 pb-4">
                            Project Overview
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    DataFlowAI is an interactive web application
                                    designed to demystify machine learning
                                    algorithms through intuitive visualizations.
                                    Our platform allows users to interact with
                                    real-time demonstrations of key algorithms,
                                    making complex concepts more approachable.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We focus on four fundamental algorithms that
                                    form the backbone of machine learning:
                                    Linear Regression, Logistic Regression,
                                    K-Nearest Neighbors, and K-Means Clustering.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Each visualization provides hands-on
                                    learning through interactive demonstrations,
                                    allowing users to manipulate data points and
                                    observe how algorithms respond in real-time.
                                </p>
                            </div>
                            <div>
                                <div className="bg-amber-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                        Key Features
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-amber-500 mr-2">
                                                ✓
                                            </span>
                                            <span>
                                                Interactive data point
                                                manipulation
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-amber-500 mr-2">
                                                ✓
                                            </span>
                                            <span>
                                                Real-time algorithm
                                                visualization
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-amber-500 mr-2">
                                                ✓
                                            </span>
                                            <span>
                                                Performance metrics dashboard
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-amber-500 mr-2">
                                                ✓
                                            </span>
                                            <span>
                                                Step-by-step algorithm execution
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-amber-500 mr-2">
                                                ✓
                                            </span>
                                            <span>
                                                Animated training process
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Technologies Used */}
                <motion.section variants={itemVariants} className="mb-16">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b border-amber-100 pb-4">
                            Technologies Used
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {technologies.map((tech, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <p className="text-gray-800 text-center font-medium">
                                        {tech}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            </div>
        </motion.div>
    )
}

export default About
