import { Outlet } from 'react-router-dom'

import { HeaderDropdown, ModeToggle } from '@/components/app/dropdown'
import { SidebarDrawerMobile } from '@/components/app/drawer'
import { PopoverNotification } from '@/components/app/popover'

import { useDownloadStore, useThemeStore } from '@/stores'
import { cn } from '@/lib/utils'
import { DashboardSidebar } from '../sidebar'
import { BreadCrumbs } from '../breadcrumbs'
import { DownloadProgress } from '../progress/download-progress'

const DashboardLayout = () => {
  const { getTheme } = useThemeStore()
  const { progress, fileName, isDownloading } = useDownloadStore()

  return (
    <div className="box-border flex h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-5/6">
        {/* Header */}
        <header
          className={cn(
            'flex fixed top-0 left-0 z-10 gap-4 justify-between items-center px-2 w-full h-14 border-b',
            'sm:justify-end sm:fixed sm:top-0 sm:h-14',
            getTheme() === 'light' ? 'bg-white' : ''
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
          <div className="py-3">
            <BreadCrumbs />
          </div>
          <Outlet />
          {isDownloading && <DownloadProgress progress={progress} fileName={fileName} />}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
