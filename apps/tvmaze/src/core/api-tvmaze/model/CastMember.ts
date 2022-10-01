import { Country } from './Country';
import { Image } from './Image';
import { Link } from './Link';

export interface CastMember {
  person: {
    id: number;
    url: string;
    name: string;
    country: Country;
    birthday: string;
    deathday: string | null;
    gender: string;
    image: Image | null;
    _links: {
      self: Link;
    };
  };
  character: {
    id: number;
    url: string;
    name: string;
    image: Image | null;
    _links: {
      self: Link;
    };
  };
  self: false;
  voice: false;
}
