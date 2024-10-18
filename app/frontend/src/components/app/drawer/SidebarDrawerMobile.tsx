import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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
  Card
} from '@/components/ui'

import { sidebarRoutes } from '@/router/routes'
import { IconWrapper } from './IconWrapper'
import { cn } from '@/lib/utils'

export function SidebarDrawerMobile() {
  const [open, setOpen] = useState(false)
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

  const closeSheet = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <HamburgerMenuIcon className="icon" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex overflow-y-auto flex-col w-3/5 h-screen">
        <Accordion type="single" collapsible className="w-full">
          {translatedSubmenus.map((submenu) => (
            <AccordionItem key={submenu.title} value={submenu.title}>
              <AccordionTrigger
                className={cn(
                  'flex flex-1 w-full items-center py-3 font-medium text-sm mt-3 transition-all duration-200 hover:text-primary hover:no-underline',
                  '[&[data-state=open]>svg]:rotate-180 px-2 justify-between',
                  isSubmenuActive ? 'text-primary font-semibold' : ''
                )}
                minimized={false}
              >
                <div className="flex gap-2 justify-between items-center transition-all duration-300">
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
                        <span className="flex flex-row gap-2 items-center text-xs font-normal">
                          <Dot className="w-3 h-3" />
                          {item.title}
                        </span>
                      </NavLink>
                    ))}
                  </Card>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}
