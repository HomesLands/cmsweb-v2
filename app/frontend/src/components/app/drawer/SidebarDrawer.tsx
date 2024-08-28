import { NavLink } from 'react-router-dom'
import { CustomAccordionTrigger } from './CustomAccordion'
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion'
import useMenus from '@/router/routes.router'
import { CustomCard } from './CustomCard'
import IconWrapper from './IconWrapper'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface SidebarDrawerProps {
  minimized?: boolean
}

export function SidebarDrawer({ minimized }: SidebarDrawerProps) {
  const { sidebarSubmenus } = useMenus

  return (
    <Accordion type="single" collapsible className="w-full">
      {sidebarSubmenus.map((submenu) => (
        <AccordionItem key={submenu.title} value={submenu.title}>
          <CustomAccordionTrigger minimized={minimized}>
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
          </CustomAccordionTrigger>
          {minimized ? null : (
            <AccordionContent>
              {submenu.children && submenu.children.length > 0 && (
                <CustomCard>
                  {submenu.children.map((item) => (
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
                </CustomCard>
              )}
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  )
}
