import { ServiceOptions, ServiceTracker } from "@cast/core-cache";
import { Maybe } from "@cast/core-util-types";
import { KyInstance } from "ky/distribution/types/ky";
import { useEffect, useId, useState } from "react";
import { http } from "../../../core/rest/http";
import { useServiceCache } from "../../react-cache/useServiceCache";
import { useResponsesHash } from "./useResponsesHash";

type FetchOut<D = unknown, E extends Error = Error> = {
  data: Maybe<D>;
  error: Maybe<E>;
  isLoading: boolean;
};

const getServiceClient = (
  serviceTracker: ServiceTracker,
  kyInstance: KyInstance
): { client: KyInstance } => {
  const kyExtended = kyInstance.extend({
    hooks: {
      beforeRequest: [
        async (request) => {
          const isCached = await serviceTracker.isCached(request);
          if (!isCached) {
            const pendingResponse = serviceTracker.getPendingResponse(request);
            return pendingResponse
              ? await pendingResponse
              : serviceTracker.beginRequest(request);
          }
        },
      ],
      afterResponse: [
        (request, _, response) => {
          serviceTracker.endRequest({ request, response });
        },
      ],
    },
  });
  return {
    client: kyExtended,
  };
};

// Rethink API to look like MutationObserver?
//
// cache.setOptions

export const useFetch = <D = unknown, E extends Error = Error>(
  options: ServiceOptions<D, E>
): FetchOut<D, E> => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<E>();
  const [data, setData] = useState<D>();
  const serviceKey = useId();
  const responsesHash = useResponsesHash(serviceKey);
  const cache = useServiceCache();
  const key = JSON.stringify(options.key);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const serviceTracker = await cache.startService(serviceKey);
      const { client } = getServiceClient(serviceTracker, http);
      try {
        await options.try({ client });
      } catch (err) {
        setError(await options.catch(err));
      } finally {
        setLoading(false);
        await cache.endService(serviceTracker);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsesHash, key]);

  return {
    isLoading,
    error,
    data,
  };
};
