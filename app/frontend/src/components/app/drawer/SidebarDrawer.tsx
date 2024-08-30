import { NavLink } from 'react-router-dom'
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
import { sidebarSubmenus } from '@/router/routes'
import { IconWrapper } from './IconWrapper'
import { ISidebarDrawerProps } from '@/types'

export function SidebarDrawer({ minimized }: ISidebarDrawerProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {sidebarSubmenus.map((submenu) => (
        <AccordionItem key={submenu.title} value={submenu.title}>
          <AccordionTrigger
            className={cn(
              'flex flex-1 w-full items-center py-4 font-medium text-base mt-3 transition-all duration-200 hover:text-primary hover:no-underline',
              minimized
                ? 'justify-center'
                : '[&[data-state=open]>svg]:rotate-180 px-2 justify-between'
            )}
          >
            <div className="flex items-center justify-between gap-2 transition-all duration-300">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <IconWrapper Icon={submenu.icon} className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <span className="font-sans text-xs">{submenu.title}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {minimized ? null : (
                <span className={`whitespace-nowrap text-sm font-normal font-sans`}>
                  {submenu.title}
                </span>
              )}
            </div>
          </AccordionTrigger>
          {minimized ? null : (
            <AccordionContent>
              {submenu.children && submenu.children.length > 0 && (
                <Card className="border-none">
                  {submenu.children.map((item: { title: string; path: string }) => (
                    <NavLink
                      key={item.title}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-2 py-2 ml-8 duration-300 rounded-lg hover:text-primary ${
                          isActive ? 'text-primary' : ''
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
      ))}
    </Accordion>
  )
}
