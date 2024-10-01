import { producer } from "@configs";
import { logger } from "@lib";

export class ProducerService {
  public async sendMessage({
    message,
    topic,
  }: {
    topic: string;
    message: string;
  }) {
    try {
      await producer.connect();
      await producer.send({
        topic,
        messages: [{ value: message }],
      });
      logger.info(`Message sent to topic: ${topic}`);
    } catch (err) {
      logger.error(`Error sending message to ${topic}:`, err);
    } finally {
      await producer.disconnect();
    }
  }
}

export default new ProducerService();
