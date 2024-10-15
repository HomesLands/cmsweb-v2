import dotenv from "dotenv";
import os from "os";
dotenv.config();

export const stripeZeroOut = (_string: string): string => {
  return _string.replace(/^0+/, "");
};

export const isDevEnvironment = () => {
  return process.env.NODE_ENV === "development";
};

export const isWinPlatform = () => {
  return os.platform() === "win32";
};
