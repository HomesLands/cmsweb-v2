import { MappingProfile, Mapper, createMap, extend } from "@automapper/core";
import { UserResponseDto } from "@dto/response";
import { User } from "@entities";
import { baseMapper } from "./base.mapper";

// Define the mapping profile
export const userMapper: MappingProfile = (mapper: Mapper) => {
  createMap(mapper, User, UserResponseDto, extend(baseMapper(mapper))); // Map entity to response object
};
