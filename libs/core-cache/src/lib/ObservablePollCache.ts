// TODO:
// https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage
// ObservablePollCache will maintain 1 cache key that you can subscribe to

import { ManyToManySetMap } from "./ManyToManyMap";
import { ServiceKey } from "./model/ServiceKey";
import { ServiceTracker } from "./ServiceTracker";

// Cache
// Request 1->1 Response

// A cacheGroupKey can reference many requests
// Needed fast access to subscribe to all requests that changes in cache?
// cacheGroupKey -> Request

// A request can belong to many cacheGroupKeys,
// Need to keep track of this so that the request can be removed from cache when all cacheGroupKeys are removed
// Request -> cacheGroupKey

// ky.extend({
//   hooks: {
//     beforeRequest: [
//       request => {
//         // Either if it is loading or if it is already there
// 				if (pollCache.match(request)) {
//           // We still need to subscribe later
//           return await pollCache.get(request);
//         } else {
//           pollCache.isLoading(request);
//         }
// 			}
//     ]
//   }
// })

// ky.extend({
//   hooks: {
//     afterResponse: [
//       (request, response) => {
//         pollCache.add(groupKey, request, response);
// 			}
//     ]
//   }
// })

// // Opens the cache
// const pollCache = new ObservablePollCache('my-org-cache');

// // Makes sure no one else starts the same service. We are already loading it. All else can subscribe to it instead.
// const studentQuery = pollCache.startRequest('student-query');
// // Makes sure no one else starts the same request. We are already loading it.
// studentQuery.isLoading(request1);
// studentQuery.cacheRequest({ request: request1, response: response1 })
// studentQuery.isLoading(request2);
// studentQuery.cacheRequest({ request: request2, response: response2 })
// pollCache.endRequest('student-query', studentQuery);
// const unsubscribe = pollCache.subsribe('student-query', cacheUpdatedCallback);
// unsubescribe() // removes request1 and request2



export class ObservableServiceCache {
  private cacheName: string;
  private requestGroupMap = new ManyToManySetMap<ServiceKey, Request>();
  private loadingRequests: Set<Request> = new Set();

  constructor(cacheName: string) {
    this.cacheName = cacheName;
  }

  async startService(serviceKey: ServiceKey): Promise<ServiceTracker> {
    const cache = await caches.open(this.cacheName);
    return new ServiceTracker(serviceKey, cache);
  }

  endService(serviceTracker: ServiceTracker): void {
    const trackerState = serviceTracker.state;
    this.requestGroupMap.setKey(trackerState.serviceKey, trackerState.requests);
  }
}