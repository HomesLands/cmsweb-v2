import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  LogOut,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  SquareMenu,
  Users
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import LanguageSwitcher from '@/components/app/switcher/LanguageSwitcher'
import useMenus from '@/hooks/useMenus'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { SidebarDrawer } from '@/components/app/drawer/SidebarDrawer'

export function Sidebar() {
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set())
  const { t } = useTranslation()
  const { sidebarSubmenus } = useMenus
  console.log(sidebarSubmenus)

  const [isMinimized, setIsMinimized] = useState(false)

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleOpenSubmenu = (title: string) => {
    setOpenSubmenus((prev) => {
      const newOpenSubmenus = new Set(prev)
      if (newOpenSubmenus.has(title)) {
        newOpenSubmenus.delete(title)
      } else {
        newOpenSubmenus.add(title)
      }
      return newOpenSubmenus
    })
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Button
          className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleMinimize}
        >
          {isMinimized ? 'Expand' : 'Minimize'}
        </Button>
        <div className={` flex flex-col h-full gap-2 ${isMinimized ? `max-w-14` : ``}`}>
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NavLink to={'/'} className="flex items-center gap-2 font-semibold">
              <Package2 className="w-6 h-6" />
              <span className={`${isMinimized ? `hidden` : ``}`}>TBE CMS</span>
            </NavLink>
          </div>
          <div className="flex-1">
            <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
              <SidebarDrawer />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col min-w-72">
              <nav className="grid gap-2 text-lg font-medium">
                <NavLink
                  to={'/hr-subsystem'}
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="w-6 h-6" />
                  <span className="sr-only">TBE CMS</span>
                </NavLink>
                <NavLink
                  to={'/hr-subsystem'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 transition-all rounded-lg ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:text-primary'
                    }`
                  }
                >
                  <Home className="w-5 h-5" />
                  {t('HR')}
                </NavLink>
                <NavLink
                  to={'/projects'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 transition-all rounded-lg ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:text-primary'
                    }`
                  }
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t('Projects')}
                </NavLink>
                <NavLink
                  to={'/'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="w-5 h-5" />
                  Products
                </NavLink>
                <NavLink
                  to={'/'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="w-5 h-5" />
                  Customers
                </NavLink>
                <NavLink
                  to={'/'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="w-5 h-5" />
                  Analytics
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
          {/* <div className="flex-1 w-full">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div> */}
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="w-5 h-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center justify-start gap-2 text-danger">
                <LogOut className="danger-icon" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
          {/* <HRTabs /> */}
          <div
            className="flex items-center justify-center flex-1 border border-dashed rounded-lg shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">You have no products</h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
