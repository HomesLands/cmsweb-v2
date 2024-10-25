import { useState, useMemo, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'
import { BellIcon, ClockIcon, DotFilledIcon } from '@radix-ui/react-icons'

import { Popover, PopoverContent, PopoverTrigger, Button, Label, ScrollArea } from '@/components/ui'
import { useNotification, usePagination, useUpdateNotification } from '@/hooks'
import { baseURL } from '@/constants'
import { INotification } from '@/types'

export function PopoverNotification() {
  const { pagination } = usePagination()
  const { t } = useTranslation('notifications')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const navigate = useNavigate()

  const { data, isLoading, refetch } = useNotification({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    order: 'DESC'
  })

  const { mutate: updateNotification } = useUpdateNotification()

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        refetch()
      },
      5 * 60 * 1000
    )

    return () => clearInterval(intervalId)
  }, [refetch])

  const handleNotificationClick = (url: string, slug: string) => {
    updateNotification(slug)
    setIsPopoverOpen(false)
    navigate(`${baseURL}${url}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const unreadCount = useMemo(() => {
    return data?.result?.items?.filter((item) => !item.isRead).length || 0
  }, [data])

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className="relative"
        >
          <BellIcon className="h-[1.1rem] w-[1.1rem]" />
          {unreadCount > 0 && (
            <span className="flex absolute -right-[0.1rem] top-[0.1rem] justify-center items-center w-4 h-4 text-xs rounded-full bg-primary text-primary-foreground">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-1 p-0 mr-2 md:w-[24rem]">
        <div className="grid">
          <div className="flex flex-row justify-between px-4 py-5 border-b">
            <Label className="text-lg font-bold leading-none">
              {t('notifications.notification')}
            </Label>
            <NavLink
              to="/notification"
              className="text-sm text-primary"
              onClick={() => setIsPopoverOpen(false)}
            >
              {t('notifications.viewAll')}
            </NavLink>
          </div>
          <ScrollArea className="mb-3 sm:max-w-[25rem] sm:max-h-[28rem]">
            <div className="grid gap-1">
              {isLoading ? (
                <div className="flex justify-center items-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : data?.result?.items && data.result.items.length > 0 ? (
                data.result.items.map((item: INotification) => (
                  <div
                    key={item.slug}
                    onClick={() => handleNotificationClick(item.url, item.slug)}
                    className="cursor-pointer"
                  >
                    <div
                      className={`relative grid items-center grid-cols-5 gap-2 px-2 py-2 transition-all ${item.isRead ? 'bg-muted' : ''} duration-200 border-b hover:bg-muted/35`}
                    >
                      <div className="flex relative justify-center items-center w-9 h-9 rounded-2xl bg-primary/5">
                        <BellIcon className="w-4 h-4 text-primary" />
                        {!item.isRead && (
                          <DotFilledIcon className="absolute -top-1 -right-1 w-5 h-5 text-primary" />
                        )}
                      </div>

                      <div className="col-span-4">
                        <span className="text-sm font-bold text-normal">{item.type}</span>
                        <p className="text-xs text-gray-500">{item.message}</p>
                        <div className="flex flex-row gap-1 justify-start items-center mt-1">
                          <ClockIcon className="w-2.5 h-2.5" />
                          <p className="text-[0.7rem] text-normal">{formatDate(item.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="text-sm text-gray-500">{t('notifications.noNotification')}</span>
              )}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
