import { FC } from 'react';
import { useSearchQuery } from '../../api/api';
import Loading from '../../components/Loading';
import Message from '../../components/Message';
import SearchListItem from './SearchListItem';
import { SearchResultListContainer } from './styles';

interface Props {
  searchQuery: string;
}
const ShowList: FC<Props> = ({ searchQuery }) => {
  const { data, loading, error } = useSearchQuery(searchQuery);
  return (
    <>
      {loading && <Loading />}
      {error && (
        <Message type='error'>
          Oops, something went wrong: {error.message}
        </Message>
      )}
      {!loading && !error && (
        <SearchResultListContainer>
          {data.map((searchRes) => (
            <SearchListItem key={searchRes.show.id} show={searchRes.show} />
          ))}
        </SearchResultListContainer>
      )}
    </>
  );
};

export default ShowList;
