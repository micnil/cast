import { Callback } from "@cast/core-util-types";

type Key = string;

export class Subscribable {
  private subscribers = new Map<Key, Set<Callback>>();

  subscribe(key: Key, callback: Callback): Callback {
    const callbacks = this.subscribers.get(key) ?? new Set<Callback>();
    callbacks.add(callback);
    return () => callbacks.delete(callback);
  }

  protected notify(key: Key) {
    const callbacks = this.subscribers.get(key);
    callbacks?.forEach((cb) => cb());
  }
}
