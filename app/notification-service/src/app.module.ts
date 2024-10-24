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
      load: [configuration],
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '201102',
      database: 'cmsweb_db_dev',
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
