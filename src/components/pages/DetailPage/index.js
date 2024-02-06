import React from 'react';
import styled from 'styled-components';

const DetailPage = () => {
  return (
    <Wrap>
      <ContentHeader>
        <ContentTitleSection>
          <Title>
            <h2>title</h2>
          </Title>
          <ContentTitleInfo>
            <h3>info</h3>
            <div>
              <p>주소</p>
              <p>어딘가</p>
            </div>
            <div>
              <p>연락처</p>
              <p>000-0000-0000</p>
            </div>
            <div>
              <p>홈페이지</p>
              <p>여기</p>
            </div>
            <div>
              <Button>길찾기</Button>
            </div>
          </ContentTitleInfo>
        </ContentTitleSection>
      </ContentHeader>
      <ContentMain>
        <div>여긴 상세 정보</div>
        <div>여긴 지도</div>
      </ContentMain>
    </Wrap>
  );
};

export default DetailPage;

const Wrap = styled.div`
  margin-top: 72px;
  min-height: calc(100vh - 250px);
`;

const ContentHeader = styled.div`
  background-color: skyblue;
  padding: 0 calc(3.5vw + 5px);
`;

const ContentTitleSection = styled.div`
  margin-left: 30px;
  width: 423px;
  padding: 30px 36px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  height: 300px;
`;

const Title = styled.div`
  width: 260px;
  min-height: 120px;
  h2 {
    font-weight: 800;
    font-size: 32px;
    line-height: 45px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ContentTitleInfo = styled.div`
  h3 {
    font-size: 22px;
    font-weight: 600;
    display: block;
    padding-bottom: 10px;
    border-bottom: 1px solid #fff;
    line-height: 20px;
  }

  div {
    margin-top: 10px;
    clear: both;
  }

  div p:first-child {
    float: left;
    width: 70px;
  }

  div:last-child {
    clear: both;
  }
`;

const ContentMain = styled.div`
  padding: 0 calc(3.5vw + 5px);
`;

const Button = styled.p`
  display: block;
  padding: 8px;
  min-width: 84px;
  border: 1px solid #fff;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #000;
    background: #fff;
  }
`;
