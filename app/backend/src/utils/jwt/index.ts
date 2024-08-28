import * as JWT from 'jsonwebtoken';
import { default as env } from "@configs/constants/env";

export default {
  signToken: (id: string, provider: string) => {
    return JWT.sign(
      {
        iss: 'ApiAuth', //source
        id,
        provider,
        iat: Date.now(), // time sign
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 2),
      },
      env().jwtSecret
    );
  }
}