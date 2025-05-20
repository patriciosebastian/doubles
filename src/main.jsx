import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsAndConditions from './pages/TermsAndConditions.jsx'
import HowToPlay from './pages/HowToPlay.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
