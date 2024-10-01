import { Kafka } from "kafkajs";

// Kafka Consumer Logic
const kafka = new Kafka({
  clientId:
    "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611",
  brokers: ["localhost:9092"], // Update with your Kafka broker URL
});

export const consumer = kafka.consumer({ groupId: "notification-group" });

export const producer = kafka.producer();

export const admin = kafka.admin();
