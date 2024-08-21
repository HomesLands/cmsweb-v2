import { NavLink } from 'react-router-dom'
import { LogIn } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { UserAvatar } from './components/Avatar'

const Header = () => {
  return (
    <div className="header">
      <NavLink to="/dashboard">Dashboard</NavLink>
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" className="text-normal">
          <NavLink to="/auth/login" className="flex items-center justify-center gap-2">
            <LogIn className="icon" />
            Login
          </NavLink>
        </Button>
        <UserAvatar />
        <Button variant="outline" className="text-normal">
          <NavLink to="/auth/register">Register</NavLink>
        </Button>
      </div>
    </div>
  )
}

export default Header
