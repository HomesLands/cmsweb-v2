import localPassport from "passport-local";
import passport from "passport";
import bcrypt from "bcryptjs";

import { userService } from "@services";
import { IUser } from "@types";
import userRepository from "@repositories/user.repository";

export const customLocalStrategy = (): void => {
  const LocalStrategy = localPassport.Strategy;

  passport.serializeUser(function (user: IUser, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await userService.getUserById(id);
      done(null, user);
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
      async (username: string, password: string, done) => {
        try {
          const user = await userRepository.findByUsername(username);

          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!user.password) {
            return done(null, false, { message: "Incorrect password." });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
