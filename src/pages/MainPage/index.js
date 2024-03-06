import React from 'react';
import styled from 'styled-components';

import Banner from '../../components/Banner';
import Row from '../../components/Row';

import request from '../../api/request';

const MainPage = () => {
  return (
    <Container className="App">
      <Banner url={request.fetchFestivals} />
      <Row title="관광명소" id="RM" url={request.fetchAreaBased} />
      <Row title="문화시설" id="CC" url={request.fetchAreaBased} />
      <Row title="팝업스토어" id="PS" url={request.fetchFestivals} />
      <Row title="플리마켓" id="FM" url={request.fetchAreaBased} />
      <Row title="페스티벌" id="FV" url={request.fetchFestivals} />
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
