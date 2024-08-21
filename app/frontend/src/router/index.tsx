import { createBrowserRouter } from 'react-router-dom'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import DashboardLayout from '@/layouts/AuthLayout/DashboardLayout'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'dashboard',
        element: <DashboardLayout />
      }
    ]
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
])

export default router
