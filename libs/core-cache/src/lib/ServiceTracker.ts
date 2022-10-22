import { RequestResponse } from "./model/RequestResponse";
import { ServiceKey } from "./model/ServiceKey";
import { PendingRequests } from "./PendingRequests";

type ServiceTrackerState = {
  serviceKey: ServiceKey;
  requests: Set<Request>;
  getResponsesHash(): Promise<string>;
};

const hashResponses = async (responses: Response[]): Promise<string> => {
  return (
    await Promise.all(responses.map((response) => response.text()))
  ).join();
};

export class ServiceTracker {
  private requests: Set<Request> = new Set<Request>();
  private responses: Response[] = [];
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
    this.responses.push(args.response.clone());
  }

  get state(): ServiceTrackerState {
    return {
      serviceKey: this.serviceKey,
      getResponsesHash: async () => hashResponses(this.responses),
      requests: this.requests,
    };
  }
}
