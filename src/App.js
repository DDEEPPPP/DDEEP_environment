import './App.css';
import { Outlet, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import Header from './components/Header';
import Search from './components/Search';
import Row from './components/Row';
import MainPage from './components/pages/MainPage/index';
import DetailPage from './components/pages/DetailPage';
import SearchPage from './components/pages/SearchPage';
import JoinPage from './components/pages/JoinPage';

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
    <div className="App">
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<MainPage />} />
          <Route path="join" element={<JoinPage />} />
          <Route path="detail" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
