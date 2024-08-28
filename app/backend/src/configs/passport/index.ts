import passport from 'passport';

import { Application } from "express";
import session from "express-session";
import localStrategy from '@configs/passport/strategies/local.config';

const passportStrategies = (app: Application): void => {
  app.use(
    session({ secret: "SECRET", resave: true, saveUninitialized: false })
  );
  app.use(passport.initialize());

  app.use(passport.session());

  localStrategy();  

  console.log("TẠO PASSPORT");
};

export default passportStrategies;
