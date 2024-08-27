import { NavLink, Outlet } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'

import { ChevronLeft, ChevronRight, Package2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import useMenus from '@/router/routes.router'
import { SidebarDrawer } from '@/components/app/drawer/SidebarDrawer'
import { DropdownHeader } from '@/components/app/dropdown/DropdownHeader'
import { SidebarDrawerMobile } from '@/components/app/drawer/SidebarDrawerMobile'
import { useState } from 'react'
import LanguageSelect from '@/components/app/select/LanguageSelect'

const DashboardLayout = () => {
  // const { t } = useTranslation()
  const { sidebarSubmenus } = useMenus
  console.log(sidebarSubmenus)
  const [isMinimized, setIsMinimized] = useState(false)

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div
      className={`grid min-h-screen w-full transition-all duration-300 ${isMinimized ? 'grid-cols-[80px_1fr]' : 'md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'}`}
    >
      <div
        className={`hidden md:block border-r transition-all duration-300 ${isMinimized ? 'w-[80px]' : 'w-[220px] md:w-[280px]'}`}
      >
        <div className="relative flex flex-col h-full">
          <Button
            variant="outline"
            className="absolute flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bottom-3 -right-4"
            onClick={handleMinimize}
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
          <div
            className={`flex h-14 items-center border-b px-4 ${isMinimized ? 'justify-center' : 'lg:h-[60px] lg:px-6'}`}
          >
            <NavLink to={'/'} className="flex items-center gap-2 font-semibold whitespace-nowrap">
              <Package2 className="w-6 h-6" />
              <span className={`whitespace-nowrap ${isMinimized ? 'hidden' : 'block'}`}>
                TBE CMS
              </span>
            </NavLink>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav
              className={`flex flex-col gap-2 px-2 text-sm font-medium ${isMinimized ? 'justify-center items-center' : 'lg:px-4 items-start'}`}
            >
              <SidebarDrawer minimized={isMinimized} />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col transition-all duration-300">
        <header className="flex h-14 items-center justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <SidebarDrawerMobile />
          <div className="flex flex-row justify-end gap-2">
            <LanguageSelect />
            <DropdownHeader />
          </div>
        </header>
        <main className="flex flex-col flex-1 gap-4 p-2">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
