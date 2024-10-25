import { TQueryRequest } from "./base.type";

export type TNotificationQueryRequest = TQueryRequest & {
  userId: string;
};
