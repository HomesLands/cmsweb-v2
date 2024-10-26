import { producer } from "@configs/kafka.config";
import { IProducer } from "@types";

class ProductRequisitionFormProducer implements IProducer {
  async publish({
    topic,
    message,
  }: {
    topic: string;
    message: string;
  }): Promise<void> {
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [
        {
          value: message,
        },
      ],
    });
    await producer.disconnect();
  }
}

export default new ProductRequisitionFormProducer();
