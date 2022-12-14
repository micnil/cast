import { ObservableServiceCache } from "@cast/core-cache";
import { FC, ReactNode, useState } from "react";
import { ServiceCacheContext } from "./ServiceCacheContext";

type Props = {
  children: ReactNode;
};

export const ServiceCacheProvider: FC<Props> = ({ children }) => {
  const [cache] = useState(() => new ObservableServiceCache('tvmaze'));

  return (
    <ServiceCacheContext.Provider value={cache}>
      {children}
    </ServiceCacheContext.Provider>
  );
};
