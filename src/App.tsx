import { Routes, Route } from 'react-router-dom'
import LanguageProvider from './contexts/LanguageContext'
import { Toaster } from './components/Toaster'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </LanguageProvider>
  )
}

export default App