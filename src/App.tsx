import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from '@/components/ScrollToTop'

const Home = lazy(() => import('@/pages/Home'))
const Contact = lazy(() => import('@/pages/Contact'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Privacy = lazy(() => import('@/pages/Privacy'))

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/privacidad" element={<Privacy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
