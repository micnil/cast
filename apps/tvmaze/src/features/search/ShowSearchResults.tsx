import { FC } from "react";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { useSearchQuery } from "./hooks/useSearchQuery";
import SearchListItem from "./SearchListItem";
import { SearchResultListContainer } from "./styles";

interface Props {
  searchQuery: string;
}
const ShowList: FC<Props> = ({ searchQuery }) => {
  const { searchResults, isLoading, error } = useSearchQuery({ searchQuery });
  return (
    <>
      {isLoading && <Loading />}
      {error && (
        <Message type="error">
          Oops, something went wrong: {error.message}
        </Message>
      )}
      {!isLoading && !error && (
        <SearchResultListContainer>
          {searchResults.map((searchRes) => (
            <SearchListItem key={searchRes.show.id} show={searchRes.show} />
          ))}
        </SearchResultListContainer>
      )}
    </>
  );
};

export default ShowList;
