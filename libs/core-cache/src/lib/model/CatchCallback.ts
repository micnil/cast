type CatchCallbackOut<E extends Error = Error> = Promise<E>;

export type CatchCallback<E extends Error = Error> = (
  err: unknown
) => CatchCallbackOut<E>;
