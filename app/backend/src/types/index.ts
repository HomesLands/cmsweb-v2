export interface IEnv {
  dataSource: {
    hostMySql: string;
    userMySql: string;
    passwordMySql: string;
    databaseMySql: string;
  };
}

export interface IApiResponse<T> {
  result: T;
  code: number;
  message: string;
  error: boolean;
  method: string;
  path: string;
}

export interface ICreateUserRequestDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}
