import localPassport from "passport-local";
import passport from "passport";
import bcrypt from "bcryptjs";

import { userRepository } from "@repositories";
import { User } from "@entities";

export const customLocalStrategy = (): void => {
  const LocalStrategy = localPassport.Strategy;

  passport.serializeUser(function (user: User, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await userRepository.findOneBy({ id });
      done(null, user);
    } catch (error) {
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
          const user = await userRepository.findOneBy({ username });
          if (!user?.password)
            return done(null, false, { message: "Password is empty." });

          const isMatch = bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Password is not match." });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
