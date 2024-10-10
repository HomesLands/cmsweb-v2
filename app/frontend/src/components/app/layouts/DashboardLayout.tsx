import { NavLink, Outlet } from 'react-router-dom'
import { PinLeftIcon, PinRightIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui'

import { HeaderDropdown, ModeToggle } from '@/components/app/dropdown'
import { SidebarDrawerMobile, SidebarDrawer } from '@/components/app/drawer'
import { useLayoutStore } from '@/stores'
import { TbeLogo } from '@/assets/images'
import { SelectLanguage } from '@/components/app/select'
import { PopoverNotification } from '@/components/app/popover'
import { cn } from '@/lib/utils'

const DashboardLayout = () => {
  const { isMinimized, toggleMinimized } = useLayoutStore()

  return (
    <div className="box-border flex h-screen">
      {/* Sidebar */}
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
                  className={`whitespace-nowrap text-lg font-extrabold ${isMinimized ? 'hidden' : 'block'}`}
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

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-5/6">
        {/* Header */}
        <header
          className={cn(
            'flex fixed top-0 left-0 z-10 gap-4 justify-between items-center px-2 w-full h-14 border-b',
            'sm:justify-end sm:fixed sm:top-0 sm:h-14'
          )}
        >
          <SidebarDrawerMobile />
          <div className="flex flex-row gap-1 justify-end items-center h-14">
            {/* <SelectLanguage /> */}
            <PopoverNotification />
            <ModeToggle />
            <HeaderDropdown />
          </div>
        </header>

        {/* Main Content (Outlet) */}
        <main className="p-4 mt-12 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
