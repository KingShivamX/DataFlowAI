import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const Footer = () => {
    const navigate = useNavigate()

    const footerLinks = {
        product: [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "GitHub", url: "https://github.com/KingShivamX" },
        ],
        algorithms: [
            { name: "Linear Regression", path: "/linear-regression" },
            { name: "Logistic Regression", path: "/logistic-regression" },
            { name: "K-Nearest Neighbors", path: "/knn" },
            { name: "K-Means Clustering", path: "/kmeans" },
        ],
        contact: [
            { name: "Email", value: "dataflowai@support.com" },
            { name: "Twitter", url: "https://twitter.com/KingShivamX" },
            {
                name: "LinkedIn",
                url: "https://linkedin.com/in/shivamhippalgave",
            },
        ],
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <footer className="bg-gradient-to-r from-yellow-50/90 to-amber-50/80 backdrop-blur-lg text-gray-700 pt-14 pb-10 px-4 border-t border-amber-100/30">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Logo and Description */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-1 mb-4"
                    >
                        <div className="flex items-center space-x-2 mb-5">
                            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 w-8 h-8 rounded-lg flex items-center justify-center shadow-md">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">
                                    <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent">
                                        Data
                                    </span>
                                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                                        Flow
                                    </span>
                                    <span className="text-gray-800 font-black">
                                        AI
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Demystifying machine learning algorithms through
                            interactive visualizations. Learn by doing and
                            seeing.
                        </p>
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} DataFlowAI. Minor
                            Project MIT-AoE.
                        </p>
                    </motion.div>

                    {/* Product Links */}
                    <motion.div variants={itemVariants} className="col-span-1">
                        <h3 className="text-lg font-semibold mb-5 text-amber-600">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link, index) => (
                                <li key={index}>
                                    {link.path ? (
                                        <button
                                            onClick={() => navigate(link.path)}
                                            className="text-gray-600 hover:text-amber-700 transition-colors"
                                        >
                                            {link.name}
                                        </button>
                                    ) : (
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-amber-700 transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Algorithms Links */}
                    <motion.div variants={itemVariants} className="col-span-1">
                        <h3 className="text-lg font-semibold mb-5 text-amber-600">
                            Algorithms
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.algorithms.map((link, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => navigate(link.path)}
                                        className="text-gray-600 hover:text-amber-700 transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants} className="col-span-1">
                        <h3 className="text-lg font-semibold mb-5 text-amber-600">
                            Contact
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.contact.map((link, index) => (
                                <li key={index} className="flex items-center">
                                    {link.url ? (
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-amber-700 transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    ) : (
                                        <span className="text-gray-600">
                                            {link.name}: {link.value}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    variants={itemVariants}
                    className="mt-10 pt-6 border-t border-amber-200/30 text-center text-sm text-gray-500"
                >
                    <p>Designed for machine learning enthusiasts everywhere</p>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer
