import { NavLink } from 'react-router-dom'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button
} from '@/components/ui'

import { sidebarSubmenus } from '@/router/routes'
import { IconWrapper } from './IconWrapper'

export function SidebarDrawerMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <HamburgerMenuIcon className="icon" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col min-w-72">
        <Accordion type="single" collapsible className="w-full">
          {sidebarSubmenus.map((submenu) => (
            <AccordionItem key={submenu.title} value={submenu.title}>
              <AccordionTrigger className="flex items-center justify-start" minimized={false}>
                <div className="flex items-center gap-2">
                  <IconWrapper Icon={submenu.icon} className="w-5 h-5 text-normal" />
                  <span className="font-sans">{submenu.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {submenu.children && submenu.children.length > 0 && (
                  <div className="flex flex-col gap-2 ml-4">
                    {submenu.children.map((item) => (
                      <NavLink
                        key={item.title}
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 transition-all rounded-lg ${
                            isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                          }`
                        }
                      >
                        <span>{item.title}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}
