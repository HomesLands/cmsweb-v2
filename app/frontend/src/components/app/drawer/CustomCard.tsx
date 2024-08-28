import { Card } from '@/components/ui/card'
import React from 'react'

export const CustomCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => (
    <Card ref={ref} className="bg-transparent border-none shadow-none" {...props} />
  )
)
