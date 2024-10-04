import { authorityController } from "@controllers";
import { Router } from "express";

export const authorityRoute: Router = Router();

// [GET] /api/v1/authorities
authorityRoute.route("/").get(authorityController.getAllAuthorities);

// [POST] /api/v1/authorities
authorityRoute.route("/").post(authorityController.createAuthority);

// [GET] /api/v1/authorities/{slug}
authorityRoute.route("/:slug").get(authorityController.getAuthorityBySlug);

// [PATCH] /api/v1/authorities/{slug}
authorityRoute.route("/:slug").patch(authorityController.updateAuthority);
