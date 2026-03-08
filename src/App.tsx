import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import About from './pages/About'
import Why from './pages/Why'
import './App.css'

function App() {
  const location = useLocation()

  return (
    <div className="app">
      <Nav />
      <main className="main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/about" element={<About />} />
            <Route path="/why" element={<Why />} />
            <Route path="*" element={<Navigate to="/about" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className="footer">
        built by tamara and william.
      </footer>
    </div>
  )
}

export default App
