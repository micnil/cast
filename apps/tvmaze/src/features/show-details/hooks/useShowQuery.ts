import { ShowDetailed } from "../../../core/api-tvmaze/model/ShowDetailed";
import { ShowService } from "../../../core/api-tvmaze/service/ShowService";
import { useFetch } from "../../core-web/hooks/useFetch";
import { errorHandler } from "../../core-web/util/errorHandler";

type Props = {
  id?: string;
};

type ShowQuery = {
  show?: ShowDetailed;
  isLoading: boolean;
  error?: Error;
};

export const useShowQuery = ({ id }: Props): ShowQuery => {
  const { data, error, isLoading } = useFetch({
    try: async () => {
      if (id) {
        return await ShowService.getById(Number(id));
      } else {
        throw new Error("no ID provided");
      }
    },
    catch: async (err) => errorHandler(err),
    key: ["show-details", id],
  });

  return {
    show: data,
    error,
    isLoading,
  };
};
