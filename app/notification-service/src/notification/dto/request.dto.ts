import { AutoMap } from '@automapper/classes';

export class CreateNotificationDto {
  @AutoMap()
  message: string;

  @AutoMap()
  type: number;

  @AutoMap()
  url: string;

  @AutoMap()
  userId: string;
}
