import { Maybe } from "@cast/core-util-types";
import { Country } from "./Country";

export type Company = {
  id: number;
  name: string;
  country: Maybe<Country>;
};
