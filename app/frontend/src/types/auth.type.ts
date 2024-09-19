export interface ILoginRequest {
  username: string
  password: string
}

export interface ILoginResponse {
  expireTime: string
  expireTimeRefreshToken: string
  token: string
  refreshToken: string
}

export interface IRegisterRequest {
  fullname: string
  username: string
  password: string
}

export interface IRefreshTokenRequest {
  expiredToken: string
  refreshToken: string
}

export interface IRefreshTokenResponse {
  expireTime: string
  expireTimeRefreshToken: string
  token: string
  refreshToken: string
}

export interface ILogoutRequest {
  token: string
  refreshToken: string
}
