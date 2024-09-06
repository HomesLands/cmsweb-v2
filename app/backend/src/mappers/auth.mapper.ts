import { MappingProfile, Mapper, createMap } from "@automapper/core";
import { RegistrationRequestDto } from "@dto/request";

// Define the mapping profile
export const authMapper: MappingProfile = (mapper: Mapper) => {
  // createMap(mapper, RegistrationRequestDto, ); // Map plain object to RegistrationRequestDto
};
