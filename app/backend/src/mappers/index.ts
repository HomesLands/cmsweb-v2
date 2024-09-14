import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { authMapper } from "./auth.mapper";
import { userMapper } from "./user.mapper";

export const mapper = createMapper({
  strategyInitializer: classes(),
});

authMapper(mapper);
userMapper(mapper);
