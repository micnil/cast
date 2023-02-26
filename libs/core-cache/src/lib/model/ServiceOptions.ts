import { CatchCallback } from "./CatchCallback";
import { TryCallback } from "./TryCallback";

export type ServiceOptions<D = unknown, E extends Error = Error> = {
  try: TryCallback<D>;
  catch: CatchCallback<E>;
  key: unknown[];
};
