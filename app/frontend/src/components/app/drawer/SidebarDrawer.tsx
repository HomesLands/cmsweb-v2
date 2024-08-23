import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './CustomAccordion'
import useMenus from '@/hooks/useMenus'
import { NavLink } from 'react-router-dom'
import { Card } from './CustomCard'
import IconWrapper from './IconWrapper' // Thay đổi đường dẫn nếu cần

export function SidebarDrawer() {
  const { sidebarSubmenus } = useMenus

  return (
    <Accordion type="single" collapsible className="w-full">
      {sidebarSubmenus.map((submenu) => (
        <AccordionItem key={submenu.title} value={submenu.title}>
          <AccordionTrigger className="flex items-center justify-start">
            <div className="flex items-center justify-between gap-2">
              {/* Thay đổi icon với IconWrapper */}
              <IconWrapper Icon={submenu.icon} className="w-4 h-4 text-normal" />
              <span className="font-sans">{submenu.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {submenu.children && submenu.children.length > 0 && (
              <Card>
                {submenu.children.map((item) => (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    className="flex items-center justify-start gap-2 py-2 ml-8 duration-200 rounded-lg hover:text-primary"
                  >
                    {/* Thay đổi icon với IconWrapper */}
                    {/* <IconWrapper Icon={item.icon} className="w-4 h-4" /> */}
                    <span className="font-sans font-normal">{item.title}</span>
                  </NavLink>
                ))}
              </Card>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
