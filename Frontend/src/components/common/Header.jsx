import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Navigation links
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Linear Regression", path: "/linear-regression" },
        { name: "Logistic Regression", path: "/logistic-regression" },
        { name: "KNN", path: "/knn" },
        { name: "K-Means", path: "/kmeans" },
        { name: "About", path: "/about" },
    ]

    // Check if user has scrolled
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-md py-2"
                    : "bg-transparent py-4"
            }`}
        >
            <div className="container mx-auto px-4 py-2 pb-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center"
                    >
                        <div
                            onClick={() => navigate("/")}
                            className="flex items-center space-x-2 cursor-pointer group"
                        >
                            <motion.div
                                whileHover={{ rotate: 0 }}
                                transition={{ duration: 0 }}
                                className="bg-gradient-to-r from-yellow-400 to-amber-500 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-lg"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 sm:h-6 sm:w-6 text-white"
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
                            </motion.div>
                            <div>
                                <h1 className="text-lg sm:text-xl md:text-2xl font-bold transition duration-300">
                                    <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent">
                                        Data
                                    </span>
                                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                                        Flow
                                    </span>
                                    <span className="text-gray-800 font-black">
                                        AI
                                    </span>
                                </h1>
                                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300"></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-1">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.path}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                }}
                            >
                                <button
                                    onClick={() => navigate(link.path)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        location.pathname === link.path
                                            ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white"
                                            : "text-gray-700 hover:bg-yellow-50 transition-colors"
                                    }`}
                                >
                                    {link.name}
                                </button>
                            </motion.div>
                        ))}

                        <motion.a
                            href="https://github.com/KingShivamX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-yellow-50"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: navLinks.length * 0.1,
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <svg
                                className="w-5 h-5 mr-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            GitHub
                        </motion.a>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="text-gray-700 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {!isMobileMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <motion.div
                    className="md:hidden mt-2 shadow-lg rounded-b-xl overflow-hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="bg-white/95 backdrop-blur-md px-2 pt-2 pb-3 space-y-1 border-t">
                        {navLinks.map((link) => (
                            <button
                                key={link.path}
                                onClick={() => {
                                    navigate(link.path)
                                    setIsMobileMenuOpen(false)
                                }}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                                    location.pathname === link.path
                                        ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white"
                                        : "text-gray-700 hover:bg-yellow-50"
                                }`}
                            >
                                {link.name}
                            </button>
                        ))}
                        <a
                            href="https://github.com/KingShivamX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-yellow-50"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            GitHub
                        </a>
                    </div>
                </motion.div>
            )}

            {/* Progress bar - appears only when scrolling */}
            {isScrolled && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 origin-left"
                ></motion.div>
            )}
        </header>
    )
}

export default Header
