import './App.css';
import { Outlet, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import Header from './components/Header';
import Search from './components/Search';
import Row from './components/Row';

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
      <Header />
      <Search />
      <Banner />
      <Row />
    </div>
  );
}

export default App;
