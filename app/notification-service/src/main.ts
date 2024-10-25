import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import configuration from 'config/configuration';

async function bootstrap() {
  const logger = new Logger('main');

  // const configService = app.get(ConfigService);
  // const broker = configService.get<string>('BROKER_URL');
  // const port = configService.get<number>('PORT') || 3002;
  // const environment = configService.get<string>('NODE_ENV');
  const { broker } = configuration();
  logger.log(`broker: ${broker}`);

  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'my-app',
        brokers: [broker],
      },
      consumer: {
        groupId: 'product-requisition-consumer',
      },
    },
  };
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  await app.listen();

  // app.connectMicroservice(microserviceOptions);
  // await app.listen(port);
  // logger.log(
  //   `${environment}, Microservice ready to receive Kafka messages in PORT - ${port}`,
  // );
}
bootstrap();
