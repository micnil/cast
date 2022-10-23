import { Maybe } from "@cast/core-util-types";
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

  async isCached(request: Request): Promise<boolean> {
    return !!(await this.cache.match(request));
  }

  getPendingResponse(request: Request): Maybe<Promise<Response>> {
    return this.pendingRequests.getResponse(request);
  }

  beginRequest(request: Request) {
    this.pendingRequests.isLoading(request);
  }

  endRequest(args: RequestResponse) {
    this.pendingRequests.resolve(args);
    this.cache.put(args.request, args.response.clone());
    this.requests.add(args.request.clone());
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
