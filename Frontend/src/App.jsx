import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./components/Home"
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"
import LinearRegression from "./algorithms/LinearRegression"
import LogisticRegression from "./algorithms/LogisticRegression"
import KNN from "./algorithms/KNN"
import KMeans from "./algorithms/KMeans"
import About from "./components/About"
import NotFound from "./components/common/NotFound"
import { AnimatePresence } from "framer-motion"

function App() {
    const location = useLocation()

    // Check if the current route is an algorithm page
    const isAlgorithmPage = [
        "/linear-regression",
        "/logistic-regression",
        "/knn",
        "/kmeans",
    ].includes(location.pathname)

    return (
        <>
            {!isAlgorithmPage && <Header />}
            <AnimatePresence mode="wait">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/linear-regression"
                        element={<LinearRegression />}
                    />
                    <Route
                        path="/logistic-regression"
                        element={<LogisticRegression />}
                    />
                    <Route path="/knn" element={<KNN />} />
                    <Route path="/kmeans" element={<KMeans />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AnimatePresence>
            {!isAlgorithmPage && <Footer />}
        </>
    )
}

export default App
