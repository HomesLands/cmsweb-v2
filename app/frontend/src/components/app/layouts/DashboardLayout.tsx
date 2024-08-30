import { NavLink, Outlet } from 'react-router-dom'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { Button } from '@/components/ui'

import { DropdownHeader } from '@/components/app/dropdown'
import { SidebarDrawerMobile, SidebarDrawer } from '@/components/app/drawer'
import { useLayoutStore } from '@/stores'
import tbeLogo from '@/assets/images/tbe-logo.png'
import { SelectLanguage } from '@/components/app/select'

const DashboardLayout = () => {
  const { isMinimized, toggleMinimized } = useLayoutStore()

  return (
    <div className="box-border flex h-screen">
      {/* Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r transition-all duration-300 ${isMinimized ? 'min-w-[80px]' : 'min-w-[250px]'}`}
      >
        <div className="relative flex flex-col h-full">
          <Button
            variant="outline"
            className="absolute flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full text-normal hover:bg-primary hover:text-white bottom-3 -right-4"
            onClick={toggleMinimized}
          >
            {isMinimized ? (
              <div>
                <ArrowRightFromLine className="w-3.5 h-3.5" />
              </div>
            ) : (
              <div>
                <ArrowLeftFromLine className="w-3.5 h-3.5" />
              </div>
            )}
          </Button>

          <div className="flex-1">
            <div
              className={`flex h-14 items-center border-b px-4 ${isMinimized ? 'justify-center text-normal' : 'lg:px-6'}`}
            >
              <NavLink to={'/'} className="flex items-center gap-2 font-semibold whitespace-nowrap">
                <img src={tbeLogo} height={28} width={28} />
                <span
                  className={`whitespace-nowrap ${isMinimized ? 'hidden' : 'block text-normal'}`}
                >
                  TBE CMS
                </span>
              </NavLink>
            </div>
            <nav
              className={`px-3 flex flex-col gap-2 text-sm font-medium ${isMinimized ? 'justify-center items-center' : 'items-start'}`}
            >
              <SidebarDrawer />
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 flex items-center justify-end gap-4 px-4 transition-all duration-300 border-b backdrop-blur-3xl h-14 lg:px-6">
          <SidebarDrawerMobile />
          <div className="flex flex-row justify-end gap-2">
            <SelectLanguage />
            <DropdownHeader />
          </div>
        </header>

        {/* Main Content (Outlet) */}
        <main className="flex-1 w-full p-4 overflow-hidden overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
