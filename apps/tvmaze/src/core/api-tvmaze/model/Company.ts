import { Maybe } from "../../common/model/Maybe";
import { Country } from "./Country";

export type Company = {
  id: number;
  name: string;
  country: Maybe<Country>;
};
