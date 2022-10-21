import { noop } from "../util/noop";

export type DestructedPromise<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
};

export const DestructedPromise = <T = unknown>(): DestructedPromise<T> => {
  let resolve: (value: T | PromiseLike<T>) => void = noop;
  let reject: (reason: unknown) => void = noop;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    promise,
    resolve,
    reject,
  };
};
