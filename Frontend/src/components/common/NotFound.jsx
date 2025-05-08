import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="pt-24 pb-12 min-h-[84vh] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50/80 via-amber-50/60 to-amber-50/80 bg-fixed">
            <motion.div
                className="bg-white/30 backdrop-blur-sm rounded-3xl p-12 shadow-sm max-w-xl w-full mx-4 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                <motion.h1
                    className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-500 bg-clip-text text-transparent"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    404
                </motion.h1>
                <p className="text-xl mb-4 text-gray-700">
                    Oops! Looks like this page took a wrong turn and got lost in
                    the digital wilderness!
                </p>
                <p className="text-lg mb-8 text-gray-600 italic">
                    Maybe it went on vacation?
                </p>
                <div className="mb-8">
                    <img
                        src="notfound.gif"
                        alt="John Travolta confused"
                        className="rounded-lg w-64 mx-auto shadow-md"
                    />
                </div>
                <motion.button
                    onClick={() => navigate("/")}
                    className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center mx-auto font-medium"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    Take Me Home
                </motion.button>
            </motion.div>
        </div>
    )
}

export default NotFound
