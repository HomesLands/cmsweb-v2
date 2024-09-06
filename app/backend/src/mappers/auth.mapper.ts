import { MappingProfile, Mapper, createMap } from "@automapper/core";
import { RegistrationRequestDto } from "@dto/request";
import { User } from "@entities";

// Define the mapping profile
export const authMapper: MappingProfile = (mapper: Mapper) => {
  createMap(mapper, RegistrationRequestDto, User); // Map request object to entity
};
