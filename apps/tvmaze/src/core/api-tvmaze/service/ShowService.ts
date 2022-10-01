import { http } from '../../rest/http';
import { Show } from '../model/Show';
import { ShowSearchResult } from '../model/ShowSearchResult';

const prefixUrl = 'https://api.tvmaze.com';

const search = async (searchStr: string): Promise<ShowSearchResult> => {
  return await http
    .get(`/search/shows`, {
      searchParams: {
        q: searchStr,
      },
      prefixUrl,
    })
    .json<ShowSearchResult>();
};

const getById = async (id: number): Promise<Show> => {
  return await http
    .get(`shows/${id}?embed[]=cast&embed[]=previousepisode`, {
      prefixUrl,
    })
    .json<Show>();
};

export const ShowService = {
  search,
  getById
};
