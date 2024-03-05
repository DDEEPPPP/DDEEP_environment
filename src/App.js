import './App.css';
import { Outlet, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { ThemeProvider } from 'styled-components';
import theme from './constant/theme';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import JoinPage from './pages/JoinPage';
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
