import { FC } from 'react';
import Text from '../../components/Text';
import { Show } from '../../core/api-tvmaze/model/Show';
import { InfoList } from './styles';

interface Props {
  show: Show;
}
const ShowInfo: FC<Props> = ({ show }) => {
  return (
    <div>
      <h2>Show info</h2>
      <InfoList>
        {show?.network?.name && (
          <li>
            <Text label='Network:'>{show.network.name}</Text>
          </li>
        )}
        {show?.premiered && (
          <li>
            <Text label='Premiered:'>
              {new Date(show.premiered).getFullYear()}
            </Text>
          </li>
        )}
        <li>
          <Text label='Genre:'>{show?.genres.join(', ')}</Text>
        </li>
        <li>
          <Text label='Language:'>{show?.language}</Text>
        </li>
        <li>
          <Text label='Runtime:'>
            {show?.runtime === null ? 'unknown' : show.runtime + ' min'}
          </Text>
        </li>
        <li>
          <Text label='Show type:'>{show?.type}</Text>
        </li>
      </InfoList>
    </div>
  );
};

export default ShowInfo;
