import { authorityController } from "@controllers";
import { Router } from "express";

export const authorityRoute: Router = Router();

// [GET] /api/v1/authorities
authorityRoute.get("/", authorityController.getAllAuthorities);

// [POST] /api/v1/authorities
authorityRoute.post("/", authorityController.createAuthority);

// [GET] /api/v1/authorities/{slug}
authorityRoute.get("/:slug", authorityController.getAuthorityBySlug);

// [PATCH] /api/v1/authorities/{slug}
authorityRoute.patch("/:slug", authorityController.updateAuthority);

// [DELETE] /api/v1/authorities/{slug}
authorityRoute.delete("/:slug", authorityController.deleteAuthority);
