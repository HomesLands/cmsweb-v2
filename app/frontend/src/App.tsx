import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'

import '@/assets/index.css'
import router from './router'

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

export default App
