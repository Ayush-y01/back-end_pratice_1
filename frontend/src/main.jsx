import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {AuthProvider} from "./context/AuthContext.jsx"
import App from './App.jsx'

export const server = "http://localhost:3000"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>,
)
