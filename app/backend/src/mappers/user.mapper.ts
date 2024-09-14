import { MappingProfile, Mapper, createMap } from "@automapper/core";
import { UserResponseDto } from "@dto/response";
import { User } from "@entities";

// Define the mapping profile
export const userMapper: MappingProfile = (mapper: Mapper) => {
  createMap(mapper, User, UserResponseDto); // Map request object to entity
};
