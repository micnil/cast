import { ApiOptions } from "./ApiOptions";

type TryCallbackOut<D = unknown> = Promise<D>;
export type TryCallback<D = unknown> = (apiOptions: ApiOptions) => TryCallbackOut<D>;
