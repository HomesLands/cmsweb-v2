export interface IProducer {
  publish(data: never): Promise<void>;
}
