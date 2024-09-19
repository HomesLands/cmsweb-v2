import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { authMapper } from "./auth.mapper";
import { siteMapper } from "./site.mapper";
import { userMapper } from "./user.mapper";
import { projectMapper } from "./project.mapper";
import { unitMapper } from "./unit.mapper";
import { productMapper } from "./product.mapper";

export const mapper = createMapper({
  strategyInitializer: classes(),
});

authMapper(mapper);
siteMapper(mapper);
userMapper(mapper);
projectMapper(mapper);
unitMapper(mapper);
productMapper(mapper);
