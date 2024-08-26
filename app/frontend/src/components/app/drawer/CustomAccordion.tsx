import * as React from 'react'
import { AccordionTrigger } from '@/components/ui/accordion'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface CustomAccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionTrigger> {
  minimized?: boolean
}

export const CustomAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  CustomAccordionTriggerProps
>(({ className, children, minimized, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center py-4 font-medium text-base mt-3 transition-all duration-200 hover:text-primary hover:no-underline',
        minimized ? 'justify-center' : '[&[data-state=open]>svg]:rotate-180 px-3 justify-between',
        className
      )}
      {...props}
    >
      {children}
      {!minimized && <ChevronDown className="w-4 h-4 transition-transform duration-200 shrink-0" />}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
CustomAccordionTrigger.displayName = 'CustomAccordionTrigger'
