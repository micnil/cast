import { Maybe } from "@cast/core-util-types";
import { ManyToManySetMap } from "./ManyToManyMap";
import { ServiceKey } from "./model/ServiceKey";
import { PendingRequests } from "./PendingRequests";
import { ServiceTracker } from "./ServiceTracker";
import { Subscribable } from "./Subscribable";

type ServiceState = {
  responsesHash: string;
};

export class ObservableServiceCache extends Subscribable {
  private cache: Cache;
  private requestGroupMap = new ManyToManySetMap<ServiceKey, Request>();
  private pendingRequests = new PendingRequests();
  private serviceState = new Map<ServiceKey, ServiceState>();

  private constructor(cache: Cache) {
    super();
    this.cache = cache;
  }

  static async create(cacheName: string): Promise<ObservableServiceCache> {
    await caches.delete(cacheName);
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

  getServiceResponsesHash(serviceKey: ServiceKey): Maybe<string> {
    return this.serviceState.get(serviceKey)?.responsesHash;
  }

  async endService(serviceTracker: ServiceTracker): Promise<void> {
    const trackerState = serviceTracker.state;
    this.requestGroupMap.setKey(trackerState.serviceKey, trackerState.requests);
    const responsesHash = await trackerState.getResponsesHash();
    const prevResponsesHash = this.serviceState.get(
      trackerState.serviceKey
    )?.responsesHash;
    this.serviceState.set(trackerState.serviceKey, { responsesHash });
    if (prevResponsesHash !== responsesHash) {
      this.notify(trackerState.serviceKey);
    }
  }
}
