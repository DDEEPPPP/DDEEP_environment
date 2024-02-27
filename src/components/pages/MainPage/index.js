import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFestival } from '../../../api/testapi/get/getFestival';
import Banner from '../../Banner';
import Header from '../../Header';
import Row from '../../Row';

import axios from '../../../api/axios';
// import axios from 'axios';
import request from '../../../api/request';
import Search from '../../Search';

const MainPage = () => {
  //mockData 받아오기 추후 각 컴포넌트 별로 api 받기
  const [data, setData] = useState([]);
  const [mockData, setMockData] = useState([]);
  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await getFestival();
        setData(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMockData();
  }, []);

  return (
    <Container className="App">
      <Header />
      <Search />
      <Banner />
      <Row title="관광지" id="RM" url={request.fetchAreaBased} data={data} />
      <Row title="팝업스토어" id="PS" url={request.fetchFestivals} data={data} />
      <Row title="플리마켓" id="FM" url={request.fetchAreaBased} data={data} />
      <Row title="페스티벌" id="FV" url={request.fetchFestivals} data={data} />
    </Container>
  );
};

export default MainPage;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;
