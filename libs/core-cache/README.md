# core-cache

An observable and rehydrating cache and service tracker.

## Running unit tests

Run `nx test core-cache` to execute the unit tests via [Jest](https://jestjs.io).

## Running lint

Run `nx lint core-cache` to execute the lint via [ESLint](https://eslint.org/).

## Usage (WIP)

```js
const cache = await ObservablePollCache.create('my-product');
const studentQuery = cache.startService('student-query')

ky.extend({
  hooks: {
    beforeRequest: [
      request => {
        // Either if it is loading or if it is already there
        const response = await cache.match(request);
				if (response) {
          return response;
        } else {
          studentQuery.beginRequest(request);
        }
			}
    ],
    afterResponse: [
      (request, response) => {
        studentQuery.cacheRequest({request, response});
			}
    ]
  }
})

cache.endService(studentQuery)

const unsubscribe = cache.subsribe('student-query', cacheUpdatedCallback);
unsubscribe()
```
