import { http } from "../../rest/http";
import { ShowDetailed } from "../model/ShowDetailed";
import { ShowSearchResult } from "../model/ShowSearchResult";

const prefixUrl = "https://api.tvmaze.com";

const search = async (searchStr: string): Promise<ShowSearchResult[]> => {
  return await http
    .get(`search/shows`, {
      searchParams: {
        q: searchStr,
      },
      prefixUrl,
    })
    .json<ShowSearchResult[]>();
};

const getById = async (id: number): Promise<ShowDetailed> => {
  return await http
    .get(`shows/${id}?embed[]=cast&embed[]=previousepisode`, {
      prefixUrl,
    })
    .json<ShowDetailed>();
};

export const ShowService = {
  search,
  getById,
};
