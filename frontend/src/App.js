import "normalize.css"; // リセットCSS
import { ThemeProvider } from "styled-components";
import theme from "./components/styles/theme";
import GlobalStyle from "./components/GlobalStyle"

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Home, CryptidList } from "./pages";
import { Header, Footer } from "./components/layout";
import { PageContainer } from "./components/layout";

function App() {
  return (
    <ThemeProvider theme={theme}> 
      <>
        <GlobalStyle />
        <Header />
        <PageContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cryptids" element={<CryptidList />} />
            </Routes>
          </BrowserRouter>
        </PageContainer>
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default App;
