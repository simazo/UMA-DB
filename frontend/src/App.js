import "normalize.css"; // リセットCSS
import { ThemeProvider } from "styled-components";
import theme from "./components/styles/theme";
import GlobalStyle from "./components/GlobalStyle"

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Home, CryptidList, Cryptid } from "./pages";
import { Header, Footer } from "./components/layouts";
import { PageContainer } from "./components/layouts";
import ScrollToTop from './common/ScrollToTop'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}> 
        <GlobalStyle />
        <Header />
        <PageContainer>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cryptids" element={<CryptidList />} />
            <Route path="/cryptids/:id" element={<Cryptid />} />
          </Routes>
        </PageContainer>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
