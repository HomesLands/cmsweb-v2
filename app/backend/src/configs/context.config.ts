import { createNamespace } from "cls-hooked";

const session = createNamespace("App");

export const setUserId = (userId?: string) => {
  session.run(() => {
    session.set("userId", userId);
  });
};

export const getUserId = () => {
  return session.get("userId");
};
