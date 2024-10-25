import { notificationController } from "@controllers";
import { Router } from "express";

export const notificationRoute: Router = Router();

// [GET] /api/v1/notifications
notificationRoute.get("/", notificationController.getAllNotifications);

// [POST] /api/v1/notifications/{slug}/read
notificationRoute.post("/:slug/read", notificationController.readNotification);

// [GET] /api/v1/notifications/{slug}
notificationRoute.get("/:slug", notificationController.getNotification);
