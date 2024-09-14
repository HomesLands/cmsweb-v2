export type TRegistrationRequestDto = {
  username: string;
  password: string;
  fullname: string;
};

export type TAuthenticationRequestDto = {
  username: string;
  password: string;
};

export type TRefreshTokenRequestDto = {
  expiredToken: string;
  refreshToken: string;
};
