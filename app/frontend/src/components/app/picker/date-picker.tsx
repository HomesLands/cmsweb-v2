'use client'

import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

// Utility to generate an array of years
const generateYears = (start: number, end: number) => {
  const years = []
  for (let i = end; i >= start; i--) {
    years.push(i)
  }
  return years
}

interface DatePickerProps {
  date: string | null | undefined
  onSelect: (date: string | null) => void
  validateDate: (date: Date) => boolean
}

export function DatePicker({ date, onSelect, validateDate }: DatePickerProps) {
  const [month, setMonth] = React.useState<number>(
    date ? new Date(date.split('/').reverse().join('-')).getMonth() : new Date().getMonth()
  )
  const [year, setYear] = React.useState<number>(
    date ? new Date(date.split('/').reverse().join('-')).getFullYear() : new Date().getFullYear()
  )
  const years = generateYears(1920, new Date().getFullYear()) // 100 years range

  const parsedDate = React.useMemo(() => {
    return date ? new Date(date.split('/').reverse().join('-')) : undefined
  }, [date])

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate && validateDate(selectedDate)) {
      onSelect(format(selectedDate, 'dd/MM/yyyy'))
    } else {
      onSelect(null)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 w-4 h-4" />
          {date ? (
            format(new Date(date.split('/').reverse().join('-')), 'PPP')
          ) : (
            <span>Chọn ngày</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-auto" align="start">
        {/* Month and Year Selection */}
        <div className="flex justify-between items-center mb-4 space-x-2">
          <Select value={String(month)} onValueChange={(value) => setMonth(Number(value))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tháng" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={String(i)}>
                  {format(new Date(0, i), 'MMMM')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={String(year)} onValueChange={(value) => setYear(Number(value))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Năm" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Calendar */}
        <Calendar
          mode="single"
          selected={parsedDate}
          onSelect={handleSelectDate}
          month={new Date(year, month)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
