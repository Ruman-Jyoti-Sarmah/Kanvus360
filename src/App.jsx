import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Loading from './components/Loading'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const [loading, setLoading] = useState(true)
  const onDone = useCallback(() => setLoading(false), [])
  const onReady = useCallback(() => setLoading(false), [])

  return (
    <BrowserRouter>
      <AnimatePresence>{loading && <Loading done={onDone} />}</AnimatePresence>

      <Routes>
        <Route element={<Layout onReady={onReady} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}