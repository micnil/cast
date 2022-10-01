import styled from 'styled-components';

export const StyledSearchForm = styled.form`
  grid-column: 1 / -1;
  display: flex;
`;

export const SearchResultListContainer = styled.div`
  grid-column: 1 / -1;
  margin-top: 2rem;
`;

export const ResultItemContainer = styled.article`
  display: flex;
  flex-direction: row;
  height: 100px;
  border-bottom: 2px solid white;

  :nth-child(odd) {
    background: #dfe1e5;
  }
`;

export const ResultItemImage = styled.img`
  margin-right: 10px;
  height: 100px;
`;

export const InfoContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ShowTitle = styled.h3`
  display: inline;
  margin: 0px;
`;

export const ShowSubtitle = styled.div`
  font-style: italic;
`;

export const LogoHeader = styled.header`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const LogoImage = styled.img`
  max-width: 300px;
`