import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from '@/components/ScrollToTop'

const Home = lazy(() => import('@/pages/Home'))
const Contact = lazy(() => import('@/pages/Contact'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
