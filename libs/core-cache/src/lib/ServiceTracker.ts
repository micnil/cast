import { RequestResponse } from "./model/RequestResponse";
import { ServiceKey } from "./model/ServiceKey";

type ServiceTrackerState = {
  serviceKey: ServiceKey;
  requests: Set<Request>;
};

export class ServiceTracker {
  private requests: Set<Request> = new Set<Request>();
  private serviceKey: ServiceKey;
  private cache: Cache;

  constructor(serviceKey: ServiceKey, cache: Cache, ) {
    this.cache = cache;
    this.serviceKey = serviceKey;
  }

  cacheRequest(args: RequestResponse) {
    this.cache.put(args.request, args.response);
    this.requests.add(args.request);
  }

  get state(): ServiceTrackerState {
    return {
      serviceKey: this.serviceKey,
      requests: this.requests,
    };
  }
}
