import { env } from "@constants";
import { Topic } from "@enums";
import { Kafka } from "kafkajs";

// Kafka producer Logic
const kafka = new Kafka({
  clientId: "my-app",
  brokers: [env.broker], // Update with your Kafka broker URL
});

export const producer = kafka.producer();

const process = async () => {
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: `${Topic.PRODUCT_REQUISITION_FORM}`,
        numPartitions: 2,
        replicationFactor: 1,
      },
    ],
  });
  await admin.disconnect();
};

process().then(() =>
  console.log(`${Topic.PRODUCT_REQUISITION_FORM} has been created...`)
);
