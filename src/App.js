import './App.css';
import { Outlet, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { ThemeProvider } from 'styled-components';
import theme from './constant/theme';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import JoinPage from './pages/JoinPage';
import ListPage from './pages/ListPage';
import { Reset } from 'styled-reset';
import { Provider } from 'react-redux';
import store from './store/store';

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Reset />
          <Routes>
            <Route path="/" element={<LayOut />}>
              <Route index element={<MainPage />} />
              <Route path="join" element={<JoinPage />} />
              <Route path=":contentType/:contentId" element={<DetailPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="list/:contentType/:typeId/:pageNo" element={<ListPage />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
