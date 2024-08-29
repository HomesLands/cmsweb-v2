import passport from "passport";
import { Application } from "express";
import session from "express-session";
import { env } from "@constants";

import { customLocalStrategy } from "@configs/passport/index";

export const passportStrategies = (app: Application): void => {
  app.use(
    session({ secret: env.passport.passportSecret, resave: true, saveUninitialized: false })
  );
  app.use(passport.initialize());

  app.use(passport.session());

  customLocalStrategy();

  console.log("Passport created!");
};
