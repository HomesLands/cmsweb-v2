import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger, Button, Label, ScrollArea } from '@/components/ui'
import { BellIcon, ClockIcon, DotFilledIcon } from '@radix-ui/react-icons'
import { INotification } from '@/types'
import { getNotification } from '@/api/notification'

export function PopoverNotification() {
  const [notifications, setNotifications] = useState<INotification[]>([])

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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <BellIcon className="h-[1.1rem] w-[1.1rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-1 mr-2 md:w-[24rem]">
        <div className="grid">
          <div className="space-y-2">
            <Label className="text-lg font-bold leading-none">Thông báo</Label>
          </div>
          <ScrollArea className="mt-2 sm:max-w-[25rem] sm:max-h-[22rem]">
            <div className="grid gap-1">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id}>
                    <div
                      key={notification.id}
                      className={`relative grid items-center grid-cols-5 gap-2 rounded-md px-2 py-2 ${notification.read ? 'bg-gray-50' : ''}`}
                    >
                      <div className="flex relative justify-center items-center w-9 h-9 bg-blue-50 rounded-2xl">
                        <BellIcon className="w-4 h-4 text-blue-700" />
                        {!notification.read && (
                          <DotFilledIcon className="absolute -top-1 -right-1 w-5 h-5 text-blue-600" />
                        )}
                      </div>

                      <div className="col-span-4">
                        <span className="text-sm font-bold text-normal">{notification.title}</span>
                        <p className="text-xs text-gray-500">{notification.content}</p>
                        <div className="flex flex-row gap-1 justify-start items-center mt-1">
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
                <span className="text-sm text-gray-500">Không có thông báo nào</span>
              )}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
