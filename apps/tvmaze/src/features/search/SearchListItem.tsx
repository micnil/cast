import { FC } from 'react';
import { Link } from 'react-router-dom';
import emptyImage from '../../assets/images/no-image.png';
import { Show } from '../../core/api-tvmaze/model/Show';
import {
  InfoContainer,
  ResultItemContainer,
  ResultItemImage,
  ShowSubtitle,
  ShowTitle
} from './styles';

interface Props {
  show: Show;
}
const SearchListItem: FC<Props> = ({ show }) => {
  return (
    <ResultItemContainer>
      <Link to={`/show/${show.id}`}>
        <ResultItemImage
          src={show.image?.medium ?? emptyImage}
          alt={show.name}
        />
      </Link>

      <InfoContainer>
        <Link to={`/show/${show.id}`}>
          <ShowTitle>{show.name}</ShowTitle>
          <ShowSubtitle>
            {show.premiered
              ? `${new Date(show.premiered).getFullYear()}`
              : show.status}
          </ShowSubtitle>
        </Link>
        <div>
          <span>{show.genres.join(', ')}</span>
        </div>
      </InfoContainer>
    </ResultItemContainer>
  );
};

export default SearchListItem;
