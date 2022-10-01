import { FC } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useShowQuery } from '../../api/api';
import LayoutGrid from '../../components/LayoutGrid';
import Loading from '../../components/Loading';
import Message from '../../components/Message';
import Text from '../../components/Text';
import emptyImage from '../../static/images/no-image.png';
import CastList from './CastList';
import Episode from './Episode';
import ShowInfo from './ShowInfo';
import { DetailsSection, Header, RatingCard, ShowImage } from './styles';

const ShowDetails: FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const { data, loading, error } = useShowQuery(showId);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Message type="error">
        Oops, something went wrong: {error.message}
      </Message>
    );
  }

  if (!data) {
    throw new Error(`No data in response to show with id: ${showId}`);
  }

  const prevEpisode = data?._embedded.previousepisode;
  return (
    <LayoutGrid>
      <Header>
        <h1>{data?.name}</h1>
        <RatingCard>
          <FaStar size={'1.5em'} />
          <div>
            <Text size="l">{data.rating.average ?? '?'}</Text>
            <Text size="s">/10</Text>
          </div>
        </RatingCard>
      </Header>
      <DetailsSection>
        <ShowImage src={data?.image?.medium ?? emptyImage} />
        <div
          dangerouslySetInnerHTML={{
            __html:
              data?.summary ??
              '<p>There is currenty no summary available for this show</p>',
          }}
        ></div>
      </DetailsSection>
      <DetailsSection>
        <ShowInfo show={data} />
      </DetailsSection>
      {prevEpisode && (
        <DetailsSection>
          <Episode title={'Previous episode'} episode={prevEpisode} />
        </DetailsSection>
      )}
      <DetailsSection>
        <CastList cast={data._embedded.cast} />
      </DetailsSection>
    </LayoutGrid>
  );
};

export default ShowDetails;
