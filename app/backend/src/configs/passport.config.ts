import passport from "passport";
import { Application } from "express";
import session from "cookie-session";
import { env } from "@constants";

import { customLocalStrategy } from "@configs/passport/index";

export const passportStrategies = (app: Application): void => {
  app.use(
    session({
      maxAge: 86400000, // 1 day
      secret: env.passport.passportSecret,

      // resave: true,
      // saveUninitialized: false,
    })
  );
  app.use(passport.initialize());

  app.use(passport.session());

  customLocalStrategy();

  console.log("Passport created!");
};
