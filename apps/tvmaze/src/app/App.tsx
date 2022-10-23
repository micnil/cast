import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import ErrorBoundary from "../features/core-web/components/ErrorBoundary";
import { ServiceCacheProvider } from "../features/react-cache/ServiceCacheProvider";
import Search from "../features/search/SearchView";
import ShowDetails from "../features/show-details/ShowDetails";
import { GlobalStyle } from "./GlobalStyle";

const AppContainer = styled.div`
  width: 100%;
`;

function App() {
  return (
    <ServiceCacheProvider>
      <ErrorBoundary>
        <GlobalStyle />
        <AppContainer>
          <Routes>
            <Route path="/show/:showId" element={<ShowDetails />} />
            <Route path="/" element={<Search />} />
          </Routes>
        </AppContainer>
      </ErrorBoundary>
    </ServiceCacheProvider>
  );
}

export default App;
