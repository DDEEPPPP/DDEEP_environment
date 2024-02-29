import './App.css';
import { Outlet, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import Header from './components/Header';
import Search from './components/Search';
import Row from './components/Row';
import { ThemeProvider } from 'styled-components';
import theme from './components/constant/theme';
import MainPage from './components/pages/MainPage/index';
import DetailPage from './components/pages/DetailPage';
import SearchPage from './components/pages/SearchPage';
import JoinPage from './components/pages/JoinPage';
import { Reset } from 'styled-reset';

const LayOut = () => {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Reset />
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<MainPage />} />
            <Route path="join" element={<JoinPage />} />
            <Route path=":contentType/:contentId" element={<DetailPage />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
