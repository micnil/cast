import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import ErrorBoundary from "../features/core-web/components/ErrorBoundary";
import Search from "../features/search/SearchView";
import ShowDetails from "../features/show-details/ShowDetails";
import { GlobalStyle } from "./GlobalStyle";

const AppContainer = styled.div`
  width: 100%;
`;

function App() {
  return (
    <ErrorBoundary>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/show/:showId" element={<ShowDetails />} />
          <Route path="/" element={<Search />} />
        </Routes>
      </AppContainer>
    </ErrorBoundary>
  );
}

export default App;
