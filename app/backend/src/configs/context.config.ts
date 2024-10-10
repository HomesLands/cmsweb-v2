import { AsyncLocalStorage } from "async_hooks";

type TStore = { userId?: string };

export const asl = new AsyncLocalStorage<TStore>();
