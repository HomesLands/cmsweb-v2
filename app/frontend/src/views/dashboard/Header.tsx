import { NavLink } from 'react-router-dom'
import { DropdownHeader } from '@/components/app/dropdown/DropdownHeader'

const Header = () => {
  return (
    <div className="header">
      <NavLink to="/dashboard">Dashboard</NavLink>
      <div className="flex items-center justify-center gap-2">
        <DropdownHeader />
      </div>
    </div>
  )
}

export default Header
