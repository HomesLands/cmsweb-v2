import localPassport from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";

import { userService } from "@services";

export type User = {
  id?: string;
};

export const customLocalStrategy = (): void => {
  const LocalStrategy = localPassport.Strategy;

  passport.serializeUser(function (user: User, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      // const user = await userService.getUserById(id);
      // done(null, user);
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (userName: string, password: string, done) => {
        try {
          // const user = await userService.getUserByUserName(userName);
          // if (!user) {
          //   return done(null, false, { message: "Incorrect username." });
          // }
          // const isMatch = await bcrypt.compare(password, user.password);
          // if (!isMatch) {
          //   return done(null, false, { message: "Incorrect password." });
          // }
          // return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
