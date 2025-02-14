import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BookProvider } from './contexts/BookContext.jsx'
import { AuthProvider } from './contexts/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

  <AuthProvider>
  <BookProvider>
   <App />
   </BookProvider>
  </AuthProvider>
  </StrictMode>,
)
