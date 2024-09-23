import localPassport from "passport-local";
import passport from "passport";
import bcrypt from "bcryptjs";

import { userRepository } from "@repositories";
import { User } from "@entities";
import { logger } from "@lib/logger";

export const customLocalStrategy = (): void => {
  const LocalStrategy = localPassport.Strategy;

  passport.serializeUser(function (user: User, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await userRepository.findOne({
        where: { id },
        relations: ["userRoles"],
      });
      done(null, user);
    } catch (error) {
      done(error, undefined);
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
          // Find user
          const user = await userRepository.findOneBy({ username });
          if (!user?.password)
            return done(null, undefined, { message: "Password is empty." });

          // Validate pass
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            logger.info("Password is not match.");
            return done(null, undefined, { message: "Password is not match." });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
