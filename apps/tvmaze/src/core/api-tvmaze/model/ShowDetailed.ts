import { CastMember } from './CastMember';
import { Episode } from './Episode';
import { Show } from './Show';

export type ShowDetailed = Show & {
  _embedded: {
    cast: CastMember[];
    previousepisode: Episode;
  };
};
