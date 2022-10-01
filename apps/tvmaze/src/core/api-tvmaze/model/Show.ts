import { Company } from './Company';
import { Externals } from './Externals';
import { Image } from './Image';
import { Rating } from './Rating';
import { Schedule } from './Schedule';
import { ShowLinks } from './ShowLinks';

export type Show = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  premiered?: string;
  officialSite?: string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network?: Company;
  webChannel?: Company;
  externals: Externals;
  image: Image;
  summary: string;
  updated: number;
  _links: ShowLinks;
};
