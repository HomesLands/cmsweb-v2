
import  localPassport from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';

import UserService from '@services/user.service';

export type User = {
  id?: string
}

// declare global {
//   namespace Express {
//     interface User {
//       username: string;
//       _id?: number;
//     }
//   }
// }
export default (): void => {
  const LocalStrategy = localPassport.Strategy;

  passport.serializeUser(function(user: User, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await UserService.getUserById(id);
      done(null, user);
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  });

  passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
  },
    async(userName: string ,password: string ,done) => {
      try {
        const user = await UserService.getUserByUserName(userName);

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
}






