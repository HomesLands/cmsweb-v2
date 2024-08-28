import passport from "passport";
import { Application } from "express";
import session from "express-session";

import { customLocalStrategy } from "@configs/passport/index";

export const passportStrategies = (app: Application): void => {
  app.use(
    session({ secret: "SECRET", resave: true, saveUninitialized: false })
  );
  app.use(passport.initialize());

  app.use(passport.session());

  customLocalStrategy();

  console.log("Passport created!");
};
