import { TbeLogo } from '@/assets/images'
import { Button } from '@/components/ui'
import { useLayoutStore } from '@/stores'
import { PinLeftIcon, PinRightIcon } from '@radix-ui/react-icons'
import { NavLink } from 'react-router-dom'
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
          className="flex absolute bottom-3 -right-4 justify-center items-center w-8 h-8 rounded-full transition-all duration-300 text-normal hover:bg-primary hover:text-white"
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
            className={`flex h-14 items-center border-b px-4 ${isMinimized ? 'justify-center text-normal' : 'lg:px-6'}`}
          >
            <NavLink to={'/'} className="flex gap-2 items-center font-semibold whitespace-nowrap">
              <img src={TbeLogo} height={28} width={28} />
              <span
                className={`border-l border-muted-foreground px-2 whitespace-nowrap text-lg font-extrabold ${isMinimized ? 'hidden' : 'block'}`}
              >
                TBE CMS
              </span>
            </NavLink>
          </div>
          <nav
            className={`px-3 flex flex-col gap-2 text-sm font-medium overflow-y-auto ${isMinimized ? 'justify-center items-center' : 'items-start'}`}
          >
            <SidebarDrawer />
          </nav>
        </div>
      </div>
    </aside>
  )
}
