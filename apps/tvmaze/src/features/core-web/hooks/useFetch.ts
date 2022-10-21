import { Maybe } from "@cast/core-util-types";
import { useEffect, useState } from "react";

type FetchOut<D = unknown, E extends Error = Error> = {
  data: Maybe<D>;
  error: Maybe<E>;
  isLoading: boolean;
};
type TryCallbackOut<D = unknown> = Promise<D>;
type CatchCallbackOut<E extends Error = Error> = Promise<E>;
type TryCallback<D = unknown> = () => TryCallbackOut<D>;
type CatchCallback<E extends Error = Error> = (
  err: unknown
) => CatchCallbackOut<E>;
type Options<D = unknown, E extends Error = Error> = {
  try: TryCallback<D>;
  catch: CatchCallback<E>;
  key: unknown[];
};

export const useFetch = <D = unknown, E extends Error = Error>(
  options: Options<D, E>
): FetchOut<D, E> => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<E>();
  const [data, setData] = useState<D>();

  const dep = JSON.stringify(options.key);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const out = await options.try();
        setData(out);
      } catch (err) {
        setError(await options.catch(err));
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);

  return {
    isLoading,
    error,
    data,
  };
};
