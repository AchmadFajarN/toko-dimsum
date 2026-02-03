import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './routes/router.js'
import { RouterProvider } from 'react-router'
import './style/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
