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
  private cacheName: string;
  private requestGroupMap = new ManyToManySetMap<ServiceKey, Request>();
  private pendingRequests = new PendingRequests();
  private serviceState = new Map<ServiceKey, ServiceState>();

  constructor(cacheName: string) {
    super();
    this.cacheName = cacheName;
  }

  private async getCache(): Promise<Cache> {
    return caches.open(this.cacheName);
  }

  async match(request: Request): Promise<Maybe<Response>> {
    const pendingResponse = this.pendingRequests.getResponse(request);
    if (pendingResponse) {
      return pendingResponse;
    } else {
      const cache = await this.getCache();
      return cache.match(request);
    }
  }

  async startService(serviceKey: ServiceKey): Promise<ServiceTracker> {
    const cache = await this.getCache();
    return new ServiceTracker(serviceKey, cache, this.pendingRequests);
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
