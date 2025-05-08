import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"
import LinearRegression from "./components/LinearRegression"
import LogisticRegression from "./components/LogisticRegression"
import KNN from "./components/KNN"
import KMeans from "./components/KMeans"
import About from "./components/About"
import NotFound from "./components/common/NotFound"
import { AnimatePresence } from "framer-motion"

function App() {
    return (
        <>
            <Header />
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
            <Footer />
        </>
    )
}

export default App
