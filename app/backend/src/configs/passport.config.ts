import passport from "passport";
import { Application } from "express";
import session from "cookie-session";
import { env } from "@constants";

import { customLocalStrategy } from "@configs/passport";
import { logger } from "@lib";

export const passportStrategies = (app: Application): void => {
  app.use(
    session({
      maxAge: 86400000, // 1 day
      secret: env.passportSecret,

      // resave: true,
      // saveUninitialized: false,
    })
  );
  app.use(passport.initialize());

  app.use(passport.session());

  customLocalStrategy();

  logger.info("Passport created!");
};
