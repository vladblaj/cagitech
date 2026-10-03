import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import LanguageProvider from './contexts/LanguageContext'
import { Toaster } from './components/Toaster'
import HomePage from './pages/HomePage'

const ContactPage = lazy(() => import('./pages/ContactPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <LanguageProvider>
      <Suspense fallback={<div role="status" style={{ minHeight: '100vh', padding: '48px', background: '#f5f3ed', color: '#232c27' }}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster />
    </LanguageProvider>
  )
}

export default App
