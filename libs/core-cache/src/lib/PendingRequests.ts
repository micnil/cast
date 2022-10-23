import { Maybe } from "@cast/core-util-types";
import { DestructedPromise } from "./model/DestructedPromise";
import { RequestResponse } from "./model/RequestResponse";

export class PendingRequests {
  private pendingRequests: Map<Request, DestructedPromise<Response>> =
    new Map();

  isLoading(request: Request) {
    const destructedPromise = DestructedPromise<Response>();
    this.pendingRequests.set(request, destructedPromise);
  }

  resolve({ request, response }: RequestResponse) {
    const destructedPromise = this.pendingRequests.get(request);
    destructedPromise?.resolve(response);
    this.pendingRequests.delete(request);
  }

  getResponse(request: Request): Maybe<Promise<Response>> {
    return this.pendingRequests.get(request)?.promise;
  }
}
