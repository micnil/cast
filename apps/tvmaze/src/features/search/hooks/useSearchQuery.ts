import { ShowSearchResult } from "../../../core/api-tvmaze/model/ShowSearchResult";
import { ShowService } from "../../../core/api-tvmaze/service/ShowService";
import { useFetch } from "../../core-web/hooks/useFetch";
import { errorHandler } from "../../core-web/util/errorHandler";

type Props = {
  searchQuery?: string;
};

type ShowQuery = {
  searchResults: ShowSearchResult[];
  isLoading: boolean;
  error?: Error;
};

export const useSearchQuery = ({ searchQuery }: Props): ShowQuery => {
  const {
    data = [],
    error,
    isLoading,
  } = useFetch({
    try: async () => {
      if (searchQuery) {
        return await ShowService.search(searchQuery);
      } else {
        return await ShowService.search("a");
      }
    },
    catch: async (err) => errorHandler(err),
    key: ["show-search", searchQuery],
  });

  return {
    searchResults: data,
    error,
    isLoading,
  };
};
