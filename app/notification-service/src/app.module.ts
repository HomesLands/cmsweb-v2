import configuration from './config/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Notification } from './notification/notification.entity';
import { NotificationModule } from 'notification/notification.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserModule } from 'user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [
        '.env.development.local',
        '.env.development',
        '.env.production',
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.user,
      password: configuration().database.password,
      database: configuration().database.schema,
      entities: [User, Notification],
      synchronize: false,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    NotificationModule,
    UserModule,
  ],
})
export class AppModule {}
