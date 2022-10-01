import styled from 'styled-components';

const LayoutGrid = styled.div`
  margin: 40px 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-column-gap: 20px;
  max-width: 768px;

  @media screen and (min-width: 768px) {
    margin: 40px auto;
  }
`;

export default LayoutGrid;
