import { ObservableServiceCache } from "@cast/core-cache";
import { Maybe } from "@cast/core-util-types";
import { createContext } from "react";


export const ServiceCacheContext = createContext<Maybe<ObservableServiceCache>>(undefined);
