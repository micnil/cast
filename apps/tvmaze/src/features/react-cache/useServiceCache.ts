import { useContext } from "react";
import { ServiceCacheContext } from "./ServiceCacheContext";

export const useServiceCache = () => {
  const serviceCache = useContext(ServiceCacheContext);

  if (serviceCache) {
    return serviceCache;
  } else {
    throw new Error(
      "useServiceCache must be used from a child of ServiceCacheProvider"
    );
  }
};
