import { NavLink } from 'react-router-dom'
import { PinLeftIcon, PinRightIcon } from '@radix-ui/react-icons'

import { CMSLogo } from '@/assets/images'
import { Button } from '@/components/ui'
import { useLayoutStore } from '@/stores'
import { SidebarDrawer } from '../drawer'

export default function DashboardSidebar() {
  const { isMinimized, toggleMinimized } = useLayoutStore()

  return (
    <aside
      className={`hidden md:flex flex-col border-r transition-all duration-300 ${isMinimized ? 'w-14' : 'w-1/6'}`}
    >
      <div
        className={`fixed top-0 left-0 flex flex-col h-full transition-all duration-300 ${
          isMinimized ? 'w-14' : 'w-1/6'
        }  border-r z-50`}
      >
        <Button
          variant="outline"
          className="absolute z-50 flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bottom-3 -right-4 text-normal hover:bg-primary hover:text-white"
          onClick={toggleMinimized}
        >
          {isMinimized ? (
            <div>
              <PinRightIcon className="w-3.5 h-3.5" />
            </div>
          ) : (
            <div>
              <PinLeftIcon className="w-3.5 h-3.5" />
            </div>
          )}
        </Button>

        <div className="flex-1">
          <div
            className={`flex h-14 items-center border-b px-4 ${isMinimized ? 'justify-center text-normal' : ''}`}
          >
            <NavLink
              to={'/'}
              className={`${isMinimized ? 'flex items-center gap-2 font-semibold h-1/2 whitespace-nowrap' : ''}`}
            >
              <img src={CMSLogo} className={`${isMinimized ? 'w-full' : 'w-16'}`} />
            </NavLink>
          </div>
          <nav
            className={`h-screen pb-20 flex flex-col gap-2 text-sm font-medium ${isMinimized ? 'justify-start items-center' : 'items-start'}`}
          >
            <SidebarDrawer />
          </nav>
        </div>
      </div>
    </aside>
  )
}
