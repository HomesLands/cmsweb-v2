import {
  createMap,
  extend,
  Mapper,
  MappingConfiguration,
  MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/request.dto';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateNotificationDto, Notification);
    };
  }

  //   protected get mappingConfigurations(): MappingConfiguration[] {
  // the 3 createMap() above will get this `extend()`
  // return [extend(BaseEntity, BaseDto)];
  //   }
}
