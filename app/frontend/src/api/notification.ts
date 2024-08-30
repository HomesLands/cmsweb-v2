import { Notification } from "@/types";
import notificationsData from "@/data/notifications.json";

export function getNotification(): Promise<Notification[]> {
    return new Promise((resolve) => {
        resolve(notificationsData as Notification[]);
    });
}
