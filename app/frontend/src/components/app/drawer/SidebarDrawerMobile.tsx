import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'
import { Dot } from 'lucide-react'

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  ScrollArea
} from '@/components/ui'

import { sidebarRoutes } from '@/router/routes'
import { IconWrapper } from './IconWrapper'
import { cn } from '@/lib/utils'
import { hasRequiredPermissions } from '@/utils'
import { ISidebarRoute } from '@/types'

export function SidebarDrawerMobile() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation('sidebar')

  // Translate and filter submenu items
  const translatedSidebarRoute = (sidebarRoute: ISidebarRoute) => ({
    ...sidebarRoute,
    title: t(sidebarRoute.title),
    children: sidebarRoute.children?.map((child) => ({
      ...child,
      title: t(child.title)
    }))
  })

  // Filter submenu items based on user authority
  const authorizedSidebarRoute = (sidebarRoute: ISidebarRoute) =>
    !sidebarRoute.permission || hasRequiredPermissions(sidebarRoute.permission)

  const authorizedAndTranslatedRoutes = sidebarRoutes
    .filter((item) => authorizedSidebarRoute(item))
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => authorizedSidebarRoute(child))
    }))
    .map((item) => translatedSidebarRoute(item))

  const closeSheet = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <HamburgerMenuIcon className="icon" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col w-3/5 h-screen px-0 py-4 overflow-y-auto">
        <ScrollArea className="flex-grow">
          <Accordion type="single" collapsible className="w-full">
            {authorizedAndTranslatedRoutes.map((submenu) => {
              const isSubmenuActive = location.pathname.startsWith(submenu.path)
              return (
                <AccordionItem key={submenu.title} value={submenu.title}>
                  <AccordionTrigger
                    minimized={false}
                    className={cn(
                      'flex flex-1 w-full items-center py-3 font-medium text-sm mt-4 transition-all duration-200 hover:text-primary hover:no-underline',
                      '[&[data-state=open]>svg]:rotate-180 px-2 justify-between',
                      isSubmenuActive ? 'text-primary font-semibold' : ''
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 transition-all duration-300">
                      {submenu.icon && <IconWrapper Icon={submenu.icon} className="w-3 h-3" />}
                      <span className="font-sans text-xs font-normal whitespace-nowrap">
                        {submenu.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {submenu.children && submenu.children.length > 0 && (
                      <Card className="border-none">
                        {submenu.children.map((item) => (
                          <NavLink
                            end
                            key={item.title}
                            to={item.path}
                            onClick={closeSheet}
                            className={({ isActive }) =>
                              `text-muted-foreground flex items-center gap-2 py-2 ml-4 duration-300 rounded-lg hover:text-primary ${
                                isActive ? 'text-primary font-semibold' : ''
                              }`
                            }
                          >
                            <span className="flex flex-row items-center gap-2 text-xs font-normal">
                              <Dot className="w-3 h-3" />
                              {item.title}
                            </span>
                          </NavLink>
                        ))}
                      </Card>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
