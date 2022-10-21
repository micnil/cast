// TODO:
// https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage
// ObservablePollCache will maintain 1 cache key that you can subscribe to

import { Maybe } from "@cast/core-util-types";
import { ManyToManySetMap } from "./ManyToManyMap";
import { ServiceKey } from "./model/ServiceKey";
import { PendingRequests } from "./PendingRequests";
import { ServiceTracker } from "./ServiceTracker";
import { Subscribable } from "./Subscribable";

export class ObservableServiceCache extends Subscribable {
  private cache: Cache;
  private requestGroupMap = new ManyToManySetMap<ServiceKey, Request>();
  private pendingRequests = new PendingRequests();

  private constructor(cache: Cache) {
    super();
    this.cache = cache;
  }

  static async create(cacheName: string): Promise<ObservableServiceCache> {
    const cache = await caches.open(cacheName);
    return new ObservableServiceCache(cache);
  }

  match(request: Request): Promise<Maybe<Response>> {
    const pendingResponse = this.pendingRequests.getResponse(request);
    if (pendingResponse) {
      return pendingResponse;
    } else {
      return this.cache.match(request);
    }
  }

  startService(serviceKey: ServiceKey): ServiceTracker {
    return new ServiceTracker(serviceKey, this.cache, this.pendingRequests);
  }

  endService(serviceTracker: ServiceTracker): void {
    const trackerState = serviceTracker.state;
    if (
      this.requestGroupMap.setKey(
        trackerState.serviceKey,
        trackerState.requests
      )
    ) {
      this.notify(trackerState.serviceKey);
    }
  }
}
