import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DixitApp from './pages/DixitApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DixitApp />
  </StrictMode>
)
