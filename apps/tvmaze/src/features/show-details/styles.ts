import styled from 'styled-components';
import Text from '../../components/Text';

export const Header = styled.header`
  grid-column: 1 / -1;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
  }
`;

export const RatingCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
  border-radius: 25%;
  padding: 1rem;
  vertical-align: bottom;
`;

export const ShowImage = styled.img`
  max-width: 40%;
  display: inline;
  margin-right: 0.7rem;
`;

export const EpisodeImage = styled.img`
  display: inline;
  object-fit: cover;
`;

export const DetailsSection = styled.section`
  grid-column: 1 / -1;
  display: flex;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dfe1e5;

  :last-of-type {
    border-bottom: none;
  }
`;

export const InfoList = styled.ul`
  padding-left: 0;
  list-style: none;
`;

export const EpisodeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EpisodeTitle = styled.div`
  margin-bottom: 1rem;
  h2 {
    margin-bottom: 0;
  }
`;

export const EpisodeBody = styled.div`
  display: flex;
  flex-direction: column;
  img {
    margin-right: 0;
  }
  @media screen and (min-width: 450px) {
    flex-direction: row;
    img {
      margin-right: 0.7rem;
    }
  }
`;

export const CastListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CastListItem = styled.div`
  display: flex;
  height: 70px;

  :nth-child(odd) {
    background: #dfe1e5;
  }
`;

export const CastImage = styled.img`
  height: 100%;
  margin-right: 10px;
`;

export const CastInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CastInfoText = styled(Text)`
  display: block;
`;
