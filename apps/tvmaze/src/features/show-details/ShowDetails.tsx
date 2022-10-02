import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import emptyImage from "../../assets/images/no-image.png";
import LayoutGrid from "../../components/LayoutGrid";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import Text from "../../components/Text";
import CastList from "./CastList";
import EpisodeView from "./EpisodeView";
import { useShowQuery } from "./hooks/useShowQuery";
import ShowInfo from "./ShowInfo";
import { DetailsSection, Header, RatingCard, ShowImage } from "./styles";

const ShowDetails: FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const { show, isLoading, error } = useShowQuery({ id: showId });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Message type="error">
        Oops, something went wrong: {error.message}
      </Message>
    );
  }

  if (!show) {
    throw new Error(`No data in response to show with id: ${showId}`);
  }

  const prevEpisode = show?._embedded.previousepisode;
  return (
    <LayoutGrid>
      <Header>
        <h1>{show?.name}</h1>
        <RatingCard>
          <FaStar size={"1.5em"} />
          <div>
            <Text size="l">{show.rating.average ?? "?"}</Text>
            <Text size="s">/10</Text>
          </div>
        </RatingCard>
      </Header>
      <DetailsSection>
        <ShowImage src={show?.image?.medium ?? emptyImage} />
        <div
          dangerouslySetInnerHTML={{
            __html:
              show?.summary ??
              "<p>There is currenty no summary available for this show</p>",
          }}
        ></div>
      </DetailsSection>
      <DetailsSection>
        <ShowInfo show={show} />
      </DetailsSection>
      {prevEpisode && (
        <DetailsSection>
          <EpisodeView title={"Previous episode"} episode={prevEpisode} />
        </DetailsSection>
      )}
      <DetailsSection>
        <CastList cast={show._embedded.cast} />
      </DetailsSection>
    </LayoutGrid>
  );
};

export default ShowDetails;
