import { hashCacheKey } from "./hashCacheKey";
import { CacheKey } from "./model/CacheKey";

export class Cache {
  private cache: Record<string, unknown> = {};

  get(cacheKey: CacheKey): unknown {
    return this.cache[hashCacheKey(cacheKey)];
  }

  set(cacheKey: CacheKey, data: unknown) {
    this.cache[hashCacheKey(cacheKey)] = data;
  }

  delete(cacheKey: CacheKey) {
    delete this.cache[hashCacheKey(cacheKey)];
  }

  clear() {
    this.cache = {};
  }
}
