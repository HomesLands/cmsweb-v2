import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui'

import { cn } from '@/lib/utils'
import { sidebarRoutes } from '@/router/routes'
import { IconWrapper } from './IconWrapper'
import { useLayoutStore } from '@/stores'
import { hasAuthority } from '@/utils/auth'
import { ISidebarRoute } from '@/types'

export function SidebarDrawer() {
  const { isMinimized, toggleMinimized } = useLayoutStore()
  const location = useLocation()
  const { t } = useTranslation('sidebar') // useTranslation hook with 'sidebar' namespace

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
    !sidebarRoute.authorities || hasAuthority(sidebarRoute.authorities)

  return (
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
                  'flex flex-1 w-full items-center py-4 font-medium text-base mt-3 transition-all duration-200 hover:text-primary hover:no-underline',
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
                        {submenu.icon && <IconWrapper Icon={submenu.icon} className="w-4 h-4" />}
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <span className="font-sans text-xs">{submenu.title}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {isMinimized ? null : (
                    <span className={`whitespace-nowrap text-sm font-normal font-sans`}>
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
                            `flex items-center gap-2 py-2 ml-8 duration-300 rounded-lg hover:text-primary ${
                              isActive ? 'text-primary font-semibold' : ''
                            }`
                          }
                        >
                          <span className="font-sans font-normal">{item.title}</span>
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
  )
}
