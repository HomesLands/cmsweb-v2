import { env } from "@constants";
import { Kafka } from "kafkajs";

// Kafka producer Logic
const kafka = new Kafka({
  clientId: "my-app",
  brokers: [env.broker], // Update with your Kafka broker URL
});

export const producer = kafka.producer();

export const topicName = "product-requsition-form";

const process = async () => {
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: topicName,
        numPartitions: 2,
        replicationFactor: 1,
      },
      {
        topic: `${topicName}.created`,
        numPartitions: 2,
        replicationFactor: 1,
      },
    ],
  });
  await admin.disconnect();
};

process().then(() => console.log(`${topicName} has been created...`));
