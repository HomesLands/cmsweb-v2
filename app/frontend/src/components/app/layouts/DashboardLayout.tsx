import { NavLink, Outlet } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Package2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SidebarDrawer } from '@/components/app/drawer/SidebarDrawer'
import { DropdownHeader } from '@/components/app/dropdown/DropdownHeader'
import { SidebarDrawerMobile } from '@/components/app/drawer/SidebarDrawerMobile'
import LanguageSelect from '@/components/app/select/LanguageSelect'
import { useLayoutStore } from '@/stores'

const DashboardLayout = () => {
  const { isMinimized, toggleMinimized } = useLayoutStore()

  return (
    <div className="box-border flex flex-col h-screen">
      {/* Header */}
      <header className="sticky top-0 flex items-center justify-between gap-4 px-4 transition-all duration-300 border-b backdrop-blur-3xl bg-muted/40 h-14 lg:px-6">
        <div
          className={`flex h-14 items-center border-b px-4 ${isMinimized ? 'justify-center' : 'lg:h-[60px] lg:px-6'}`}
        >
          <NavLink to={'/'} className="flex items-center gap-2 font-semibold whitespace-nowrap">
            <Package2 className="w-6 h-6" />
            <span className={`whitespace-nowrap ${isMinimized ? 'hidden' : 'block'}`}>TBE CMS</span>
          </NavLink>
        </div>
        <SidebarDrawerMobile />
        <div className="flex flex-row justify-end gap-2">
          <LanguageSelect />
          <DropdownHeader />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`hidden md:flex flex-col border-r transition-all duration-300 ${isMinimized ? 'min-w-[60px]' : 'px-2 min-w-[220px]'}`}
        >
          <div className="relative flex flex-col h-full">
            <Button
              variant="outline"
              className="absolute flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bottom-3 -right-4"
              onClick={toggleMinimized}
            >
              {isMinimized ? (
                <div>
                  <ChevronRight className="w-4 h-4 text-normal" />
                </div>
              ) : (
                <div>
                  <ChevronLeft className="w-4 h-4 text-normal" />
                </div>
              )}
            </Button>

            <div className="flex-1">
              <nav
                className={`flex flex-col gap-2 text-sm font-medium ${isMinimized ? 'justify-center items-center' : 'items-start'}`}
              >
                <SidebarDrawer minimized={isMinimized} />
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content (Outlet) */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
