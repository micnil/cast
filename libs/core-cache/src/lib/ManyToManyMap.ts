import { assertDefined } from "./util/assertDefined";
import { diffSet } from "./util/diffSet";

export class ManyToManySetMap<Key extends Iterable<Key>, Value> {
  private keyToValue = new Map<Key, Set<Value>>();
  private valueToKeys = new Map<Value, Set<Key>>();

  setKey(key: Key, requests: Set<Value>): boolean {
    const previousRequests = this.keyToValue.get(key) ?? new Set();
    const diff = diffSet(previousRequests, requests);

    if (diff.hasDiff) {
      this.keyToValue.set(key, requests);
      diff.added.forEach((value) => {
        const serviceKeys = this.valueToKeys.get(value);
        if (serviceKeys) {
          serviceKeys.add(key);
        } else {
          this.valueToKeys.set(value, new Set(key));
        }
      });
      diff.removed.forEach((value) => {
        const keys = this.valueToKeys.get(value);
        assertDefined(keys, 'Expected to find removed value in many to many map');
        keys.delete(key);
      });
      return true;
    } else {
      return false;
    }
  }
}
