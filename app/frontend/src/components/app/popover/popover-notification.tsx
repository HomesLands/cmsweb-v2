import { useEffect, useState } from 'react'
import { BellIcon, ClockIcon, DotFilledIcon } from '@radix-ui/react-icons'
import { NavLink } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger, Button, Label, ScrollArea } from '@/components/ui'
import { INotification } from '@/types'
import { getNotification } from '@/api/notification'
import { ROUTE } from '@/constants'
import { useTranslation } from 'react-i18next'

export function PopoverNotification() {
  const [notifications, setNotifications] = useState<INotification[]>([])
  const { t } = useTranslation('notifications')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    async function fetchNotifications() {
      const data = await getNotification()
      setNotifications(data)
    }
    fetchNotifications()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
          <BellIcon className="h-[1.1rem] w-[1.1rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-1 p-0 mr-2 md:w-[24rem]">
        <div className="grid">
          <div className="flex flex-row justify-between px-4 py-5 border-b">
            <Label className="text-lg font-bold leading-none">
              {t('notifications.notification')}
            </Label>
            <NavLink
              to={ROUTE.NOTIFICATION}
              className="text-sm text-primary"
              onClick={() => setIsPopoverOpen(false)}
            >
              {t('notifications.viewAll')}
            </NavLink>
          </div>
          <ScrollArea className="my-3 px-2 sm:max-w-[25rem] sm:max-h-[28rem]">
            <div className="grid gap-1">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id}>
                    <div
                      key={notification.id}
                      className="relative grid items-center grid-cols-5 gap-2 px-2 py-2 transition-all duration-200 border-b hover:bg-muted/35"
                    >
                      <div className="relative flex items-center justify-center w-9 h-9 bg-primary/5 rounded-2xl">
                        <BellIcon className="w-4 h-4 text-primary" />
                        {!notification.read && (
                          <DotFilledIcon className="absolute w-5 h-5 text-primary -top-1 -right-1" />
                        )}
                      </div>

                      <div className="col-span-4">
                        <span className="text-sm font-bold text-normal">{notification.title}</span>
                        <p className="text-xs text-gray-500">{notification.content}</p>
                        <div className="flex flex-row items-center justify-start gap-1 mt-1">
                          <ClockIcon className="w-2.5 h-2.5" />
                          <p className="text-[0.7rem] text-normal">
                            {formatDate(notification.createdAt)}
                          </p>
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
