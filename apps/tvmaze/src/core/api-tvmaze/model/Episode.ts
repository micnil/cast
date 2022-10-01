import { Image } from './Image';
import { Link } from './Link';

export interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number?: number;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  image: Image;
  summary: string;
  _links: {
    self: Link;
  };
}
