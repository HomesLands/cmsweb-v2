import { CustomAccordionTrigger } from './CustomAccordion'
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion'
import useMenus from '@/router/routes.router'
import { NavLink } from 'react-router-dom'
import { CustomCard } from './CustomCard'
import IconWrapper from './IconWrapper' // Thay đổi đường dẫn nếu cần

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
              <IconWrapper Icon={submenu.icon} className="w-4 h-4" />
              {minimized ? null : (
                <span className={`whitespace-nowrap font-sans`}>{submenu.title}</span>
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
                      className="flex items-center gap-2 py-2 ml-8 duration-300 rounded-lg hover:text-primary"
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
