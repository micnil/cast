import { ApiOptions } from "../../rest/ApiOptions";
import { ShowDetailed } from "../model/ShowDetailed";
import { ShowSearchResult } from "../model/ShowSearchResult";

const prefixUrl = "https://api.tvmaze.com";

const search = async (
  searchStr: string,
  apiOptions: ApiOptions
): Promise<ShowSearchResult[]> => {
  return await apiOptions.client
    .get(`search/shows`, {
      searchParams: {
        q: searchStr,
      },
      prefixUrl,
    })
    .json<ShowSearchResult[]>();
};

const getById = async (
  id: number,
  apiOptions: ApiOptions
): Promise<ShowDetailed> => {
  return await apiOptions.client
    .get(`shows/${id}?embed[]=cast&embed[]=previousepisode`, {
      prefixUrl,
    })
    .json<ShowDetailed>();
};

export const ShowService = {
  search,
  getById,
};
