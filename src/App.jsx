import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import MetricsCalculator from './components/MetricsCalculator.jsx'
import Home from './pages/Home.jsx'
import Theory from './pages/Theory.jsx'
import NeuralMap from './pages/NeuralMap.jsx'
import Simulator from './pages/Simulator.jsx'

function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/theory" element={<Page><Theory /></Page>} />
          <Route path="/theory/:slug" element={<Page><Theory /></Page>} />
          <Route path="/map" element={<Page><NeuralMap /></Page>} />
          <Route path="/simulator" element={<Page><Simulator /></Page>} />
          <Route path="*" element={<Page><Home /></Page>} />
        </Routes>
      </AnimatePresence>
      <MetricsCalculator />
    </div>
  )
}
