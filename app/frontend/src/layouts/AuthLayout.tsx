import React from 'react'
import { Outlet } from 'react-router-dom' // Import Outlet

interface AuthLayoutProps {
  children?: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = () => {
  return (
    <div className="auth-layout">
      <Outlet /> {/* Đây là nơi các route con sẽ được render */}
    </div>
  )
}

export default AuthLayout
