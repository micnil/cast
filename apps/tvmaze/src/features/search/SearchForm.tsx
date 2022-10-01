import { FC, useState } from 'react';
import TextInput from '../../components/TextInput';
import { StyledSearchForm } from './styles';

interface Props {
  onSubmit: (searchQuery: string) => void;
  initialValue: string;
}
const SearchForm: FC<Props> = ({ onSubmit, initialValue }) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  return (
    <StyledSearchForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(searchQuery);
      }}
    >
      <TextInput
        placeholder="Search TVMAZE"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></TextInput>
    </StyledSearchForm>
  );
};

export default SearchForm;
