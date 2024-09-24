import React from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface CustomDropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuItem> {
  // Add any additional props here
  highlight?: boolean
}

const AcceptRequisitionDropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuItem>,
  CustomDropdownMenuItemProps
>(({ className, children, highlight, ...props }, ref) => (
  <DropdownMenuItem
    ref={ref}
    className={cn(className, highlight && 'bg-green-100 text-green-600 hover:bg-green-200')}
    {...props}
  >
    {children}
  </DropdownMenuItem>
))

AcceptRequisitionDropdownMenuItem.displayName = 'AcceptRequisitionDropdownMenuItem'

export { AcceptRequisitionDropdownMenuItem }
