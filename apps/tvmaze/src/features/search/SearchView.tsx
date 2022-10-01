import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutGrid from '../../components/LayoutGrid';
import { useQueryParam } from '../core-web/hooks/useQueryParam';
import Logo from './Logo';
import SearchForm from './SearchForm';
import ShowSearchResults from './ShowSearchResults';

const SearchView: FC = () => {
  const query = useQueryParam();
  const searchQuery = query.get('search');
  const navigate = useNavigate();
  return (
    <LayoutGrid>
      <Logo />
      <SearchForm
        initialValue={searchQuery ?? ''}
        onSubmit={(searchQuery) => {
          const currentUrlParams = new URLSearchParams(window.location.search);
          currentUrlParams.set('search', searchQuery);
          navigate({ search: currentUrlParams.toString() });
        }}
      />
      {searchQuery && <ShowSearchResults searchQuery={searchQuery} />}
    </LayoutGrid>
  );
};

export default SearchView;
