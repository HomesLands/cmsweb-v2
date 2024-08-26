import dotenv from 'dotenv';

dotenv.config();

export interface IEnv {
  hostMySql: string,
  userMySql: string,
  passwordMySql: string,
  databaseMySql: string,
}

export default (): IEnv => {
  return {
    hostMySql: process.env.HOST_MYSQL!,
    userMySql: process.env.USER_MYSQL!,
    passwordMySql: process.env.PASSWORD_MYSQL!,
    databaseMySql: process.env.DATABASE_MYSQL!,
  };
};
