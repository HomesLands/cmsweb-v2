import { consumer } from "@configs";

class NotificationConsumer {
  public async consumeMessage(topic: string) {
    try {
      await consumer.connect();
      await consumer.subscribe({ topic, fromBeginning: true });

      await consumer.run({
        eachMessage: async ({ message }) => {
          console.log(
            `Received message from ${topic}: ${message.value?.toString()}`
          );
        },
      });
    } catch (err) {
      console.error(`Error consuming from ${topic}:`, err);
    }
  }
}

export default new NotificationConsumer();
