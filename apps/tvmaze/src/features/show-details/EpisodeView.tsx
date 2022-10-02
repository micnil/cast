import { FC } from 'react';
import { Episode } from '../../core/api-tvmaze/model/Episode';
import { EpisodeBody, EpisodeImage, EpisodeInfo, EpisodeTitle } from './styles';

interface Props {
  title: string;
  episode: Episode;
}
const EpisodeView: FC<Props> = ({ episode, title }) => {
  return (
    <EpisodeInfo>
      <EpisodeTitle>
        <h2>{title}</h2>
        {episode.number === null ? (
          <span>Bonus episode seaon {episode.season}</span>
        ) : (
          <span>
            '{episode.name}' | Episode {episode.season}x{episode.number}
          </span>
        )}
      </EpisodeTitle>
      <EpisodeBody>
        <EpisodeImage src={episode?.image?.medium} />
        <div
          dangerouslySetInnerHTML={{
            __html:
              episode?.summary ??
              '<p>There is currently no summary available for this episode.</p>',
          }}
        ></div>
      </EpisodeBody>
    </EpisodeInfo>
  );
};

export default EpisodeView;
