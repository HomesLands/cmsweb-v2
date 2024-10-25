import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import { Dot } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  ScrollArea // Import ScrollArea
} from '@/components/ui'

import { cn } from '@/lib/utils'
import { sidebarRoutes } from '@/router/routes'
import { IconWrapper } from './IconWrapper'
import { useLayoutStore } from '@/stores'
import { hasRequiredPermissions } from '@/utils'
import { ISidebarRoute } from '@/types'

export function SidebarDrawer() {
  const { isMinimized, toggleMinimized } = useLayoutStore()
  const location = useLocation()
  const { t } = useTranslation('sidebar')

  // Translate submenu items
  const translatedSidebarRoute = (sidebarRoute: ISidebarRoute) => ({
    ...sidebarRoute,
    title: t(sidebarRoute.title),
    children: sidebarRoute.children?.map((child) => ({
      ...child,
      title: t(child.title)
    }))
  })

  // Filter and translate submenu items based on user authority
  const authorizedSidebarRoute = (sidebarRoute: ISidebarRoute) =>
    !sidebarRoute.permission || hasRequiredPermissions(sidebarRoute.permission)

  return (
    <ScrollArea className="w-full h-full px-2">
      {' '}
      {/* Add ScrollArea here */}
      <Accordion type="single" collapsible className="w-full">
        {sidebarRoutes
          .filter((item) => authorizedSidebarRoute(item))
          .map((item) => ({
            ...item,
            children: item.children?.filter((item) => authorizedSidebarRoute(item))
          }))
          .map((item) => translatedSidebarRoute(item))
          .map((submenu) => {
            const isSubmenuActive = location.pathname.startsWith(submenu.path)
            return (
              <AccordionItem key={submenu.title} value={submenu.title}>
                <AccordionTrigger
                  minimized={isMinimized}
                  className={cn(
                    'flex flex-1 w-full items-center py-3 font-medium text-sm mt-3 transition-all duration-200 hover:text-primary hover:no-underline',
                    isMinimized
                      ? 'justify-center'
                      : '[&[data-state=open]>svg]:rotate-180 px-2 justify-between',
                    isSubmenuActive ? 'text-primary font-semibold' : ''
                  )}
                >
                  <div className="flex items-center justify-between gap-2 transition-all duration-300">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger onClick={isMinimized ? toggleMinimized : undefined}>
                          {/* Add onClick */}
                          {submenu.icon && <IconWrapper Icon={submenu.icon} className="w-3 h-3" />}
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <span className="text-sm">{submenu.title}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {isMinimized ? null : (
                      <span className={`font-sans text-xs font-normal whitespace-nowrap`}>
                        {submenu.title}
                      </span>
                    )}
                  </div>
                </AccordionTrigger>
                {isMinimized ? null : (
                  <AccordionContent>
                    {submenu.children && submenu.children.length > 0 && (
                      <Card className="border-none">
                        {submenu.children.map((item) => (
                          <NavLink
                            end
                            key={item.title}
                            to={item.path}
                            className={({ isActive }) =>
                              ` text-muted-foreground flex items-center gap-2 py-2 ml-4 duration-300 rounded-lg hover:text-primary ${
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
                )}
              </AccordionItem>
            )
          })}
      </Accordion>
    </ScrollArea>
  )
}
