import { RequestResponse } from "./model/RequestResponse";
import { ServiceKey } from "./model/ServiceKey";
import { PendingRequests } from "./PendingRequests";

type ServiceTrackerState = {
  serviceKey: ServiceKey;
  requests: Set<Request>;
};

export class ServiceTracker {
  private requests: Set<Request> = new Set<Request>();
  private serviceKey: ServiceKey;
  private cache: Cache;
  private pendingRequests: PendingRequests;

  constructor(
    serviceKey: ServiceKey,
    cache: Cache,
    pendingRequests: PendingRequests
  ) {
    this.cache = cache;
    this.serviceKey = serviceKey;
    this.pendingRequests = pendingRequests;
  }

  beginRequest(request: Request) {
    this.pendingRequests.isLoading(request);
  }

  cacheRequest(args: RequestResponse) {
    this.pendingRequests.resolve(args);
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
