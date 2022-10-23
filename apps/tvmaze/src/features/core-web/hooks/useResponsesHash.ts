import { Callback } from "@cast/core-util-types";
import { useSyncExternalStore } from "react";
import { useServiceCache } from "../../react-cache/useServiceCache";

export const useResponsesHash = (key: string) => {
  const serviceCache = useServiceCache();
  const subscribeFunc = (cb: Callback) => serviceCache.subscribe(key, cb);
  const getSnapshot = () => serviceCache.getServiceResponsesHash(key);
  return useSyncExternalStore(subscribeFunc, getSnapshot);
};
