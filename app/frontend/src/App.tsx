import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '@/assets/index.css'
import Login from './views/auth/Login'
// import Login from './layouts/Login/LoginLayout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={ Home} /> */}
          <Route path="/auth/login" element={<Login />} />
          {/* <Route path='/auth/register' element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
