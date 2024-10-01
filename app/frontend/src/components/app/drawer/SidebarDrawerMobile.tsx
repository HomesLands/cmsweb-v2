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

import { sidebarRoutes } from '@/router/routes'
import { IconWrapper } from './IconWrapper'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

export function SidebarDrawerMobile() {
  const isMinimized = false
  const isSubmenuActive = false

  const { t } = useTranslation('sidebar')

  // Translate submenu items
  const translatedSubmenus = sidebarRoutes.map((submenu) => ({
    ...submenu,
    title: t(submenu.title),
    children: submenu.children?.map((child) => ({
      ...child,
      title: t(child.title)
    }))
  }))

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
          {translatedSubmenus.map((submenu) => (
            <AccordionItem key={submenu.title} value={submenu.title}>
              <AccordionTrigger
                className={cn(
                  'flex flex-1 w-full items-center py-4 font-medium text-base mt-3 transition-all duration-200 hover:text-primary hover:no-underline',
                  isMinimized
                    ? 'justify-center'
                    : '[&[data-state=open]>svg]:rotate-180 px-2 justify-between',
                  isSubmenuActive ? 'text-primary font-semibold' : ''
                )}
                minimized={false}
              >
                <div className="flex items-center gap-2">
                  {submenu.icon && (
                    <IconWrapper Icon={submenu.icon} className="w-5 h-5 text-normal" />
                  )}
                  <span className="text-base font-beVietnamPro">{submenu.title}</span>
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
