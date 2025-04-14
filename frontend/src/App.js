import { useEffect } from 'react';

import "normalize.css"; // リセットCSS
import { ThemeProvider } from "styled-components";
import theme from "./components/styles/theme";
import GlobalStyle from "./components/GlobalStyle"

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
//import { Home, CryptidList, Cryptid } from "./pages";
import Cryptid from "./pages/Cryptid";
import {HomeContainer, CryptidsContainer} from './containers';

import { Header, Footer } from "./components/layouts";
import { PageContainer } from "./components/layouts";
import ScrollToTop from './common/ScrollToTop'

// Google Analyticsの初期化
import ReactGA from 'react-ga';
ReactGA.initialize('G-N1MX07YS57');

// Google Analyticsのトラッキング用コンポーネント
const Tracking = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <Tracking /> {/* GAトラッキング */}
      <ThemeProvider theme={theme}> 
        <GlobalStyle />
        <Header />
        <PageContainer>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/cryptids" element={<CryptidsContainer />} />
            <Route path="/cryptids/:id" element={<Cryptid />} />
          </Routes>
        </PageContainer>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
