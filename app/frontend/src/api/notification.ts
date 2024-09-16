import { INotification } from '@/types'
import notificationsData from '@/data/notifications.json'

export function getNotification(): Promise<INotification[]> {
  return new Promise((resolve) => {
    resolve(notificationsData as INotification[])
  })
}
