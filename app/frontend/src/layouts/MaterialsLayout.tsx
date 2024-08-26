import { Sidebar } from '@/views/dashboard/Sidebar'
import { Outlet } from 'react-router'

const MaterialsLayout = () => {
  return (
    <div className="auth-layout">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default MaterialsLayout
