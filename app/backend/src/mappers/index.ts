import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { authMapper } from "./auth.mapper";
import { siteMapper } from "./site.mapper";
import { userMapper } from "./user.mapper";
import { projectMapper } from "./project.mapper";

export const mapper = createMapper({
  strategyInitializer: classes(),
});

authMapper(mapper);
siteMapper(mapper);
userMapper(mapper);
projectMapper(mapper);

// createMap(
//   mapper,
//   User,
//   UserResponseDto,
//   forMember(
//     (destination) => destination.id,
//     mapFrom((source) => source.id)
//   ),
//   forMember(
//     (destination) => destination.username,
//     mapFrom((source) => source.username)
//   ),
//   forMember(
//     (destination) => destination.firstName,
//     mapFrom((source) => source.firstName)
//   ),
//   forMember(
//     (destination) => destination.lastName,
//     mapFrom((source) => source.lastName)
//   ),
//   forMember(
//     (destination) => destination.fullName,
//     mapFrom((source) => source.firstName + " " + source.lastName)
//   )
// );
