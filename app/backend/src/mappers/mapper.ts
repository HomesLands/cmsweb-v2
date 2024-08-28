import { createMapper, createMap, forMember, mapFrom } from '@automapper/core';
import { classes } from '@automapper/classes';
import { User} from '@entities/user.entity';
import { UsersResponseDto } from '@dto/response/usersResponse.dto';
import { LoginResponseDto } from '@dto/response/loginResponse.dto';

export const mapper = createMapper({
    strategyInitializer: classes(),
});

// getUser
createMap(
    mapper,
    User,
    UsersResponseDto,
    forMember(
      (destination) => destination.id,
      mapFrom((source) => source.id)
    ),
    forMember(
      (destination) => destination.userName,
      mapFrom((source) => source.userName)
    ),
    forMember(
      (destination) => destination.firstName,
      mapFrom((source) => source.firstName)
    ),
    forMember(
      (destination) => destination.lastName,
      mapFrom((source) => source.lastName)
    ),
    forMember(
      (destination) => destination.fullName,
      mapFrom((source) => source.firstName + ' ' + source.lastName)
    ),
);

// login
createMap(
  mapper,
  User,
  LoginResponseDto,
  forMember(
    (destination) => destination.id,
    mapFrom((source) => source.id)
  ),
  forMember(
    (destination) => destination.token,
    mapFrom((source) => source.token)
  ),
  forMember(
    (destination) => destination.userName,
    mapFrom((source) => source.userName)
  ),
  forMember(
    (destination) => destination.firstName,
    mapFrom((source) => source.firstName)
  ),
  forMember(
    (destination) => destination.lastName,
    mapFrom((source) => source.lastName)
  ),
  forMember(
    (destination) => destination.fullName,
    mapFrom((source) => source.firstName + ' ' + source.lastName)
  ),
);