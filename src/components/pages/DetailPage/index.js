import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../../api/axios';
import request from '../../../api/request';
import KakaoMap from '../../KakaoMap';

const DetailPage = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const url = location.pathname.split('/');
  const contentType = url[1];
  const contentId = url[2];
  const [upContentState, setUpContentState] = useState({
    listDetail: false,
    listMap: false,
  });

  // 길찾기버튼 온클릭함수
  const clickLoadFind = () => {
    const openWindow = window.open(
      `https://map.kakao.com/link/to/${content.title},${content.mapy},${content.mapx}`,
      '_blank'
    );
    if (openWindow) {
      openWindow.location.href = `https://map.kakao.com/link/to/${content.title},${content.mapy},${content.mapx}`;
    }
  };

  // div 오픈 함수
  const upContentSection = (divId) => {
    setUpContentState((prev) => ({
      ...prev,
      [divId]: !prev[divId],
    }));
  };

  const fetchDetailData = useCallback(async () => {
    try {
      const params = {
        contentId: contentId,
        defaultYN: 'Y',
        firstImageYN: 'Y',
        addrinfoYN: 'Y',
        mapinfoYN: 'Y',
        overviewYN: 'Y',
      };
      const response = await axios.get(request.fetchDetailInfo, { params });
      const item = response?.data?.response?.body?.items?.item[0] || {};
      setContent(item);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [contentId]);

  useEffect(() => {
    (async () => {
      await fetchDetailData();
    })();
  }, [fetchDetailData]);

  console.log('Item:', content);
  console.log('Detail:', upContentState.listDetail);
  console.log('Map:', upContentState.listMap);
  if (loading) {
    return <div>로딩중</div>;
  }

  return (
    <Wrap>
      <ContentHeader style={{ background: `url(${content.firstimage}) 50% 50% / cover no-repeat` }}>
        <ContentTitleSection>
          <Title>
            <h2>{content.title}</h2>
          </Title>
          <ContentTitleInfo>
            <h3>info</h3>
            <div>
              <p>주소</p>
              <p>
                {content.addr1}
                &nbsp;
                {content.addr2}
              </p>
            </div>
            <div>
              <p>연락처</p>
              <p>{content.tel}</p>
            </div>
            <div>
              <Button onClick={clickLoadFind}>길찾기</Button>
            </div>
          </ContentTitleInfo>
        </ContentTitleSection>
      </ContentHeader>
      <ContentMain>
        <ul>
          <DetailDiv $isDetailOpen={upContentState.listDetail}>
            <h2>
              <a onClick={() => upContentSection('listDetail')}>상세정보</a>
            </h2>
            <div id="listDetail">상세정보 탭 오픈</div>
          </DetailDiv>
          <MapDiv $isMapOpen={upContentState.listMap}>
            <h2>
              <a onClick={() => upContentSection('listMap')}>지도</a>
            </h2>
            <MapContainer id="listMap">
              <h3>{content.title}</h3>
              <KakaoMap mapx={content.mapx} mapy={content.mapy} mapLevel={content.mlevel} />
            </MapContainer>
          </MapDiv>
        </ul>
      </ContentMain>
    </Wrap>
  );
};

export default DetailPage;

const Wrap = styled.div`
  margin-top: 70px;
  min-height: calc(100vh - 250px);
`;

const ContentHeader = styled.div`
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
    margin-top: 15px;
    clear: both;
  }

  div p:first-child {
    float: left;
    width: 70px;
  }

  div:last-child {
    margin-top: 40px;
    clear: both;
  }
`;

const ContentMain = styled.div`
  padding: 0 calc(3.5vw + 5px);
  width: 1290px;
  margin: 0 auto;

  ul > li {
    margin-top: 10px;
  }

  ul > li > div {
    padding: 36px 10px 40px;
  }

  ul > li > h2 > a {
    cursor: pointer;
    display: block;
    padding: 15px 19px 13px;
    box-sizing: border-box;
  }
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

const MapContainer = styled.div`
  h3 {
    font-size: 24px;
    font-weight: 800;
    color: #1b1b1b;
    line-height: 24px;
    margin-bottom: 20px;
  }
`;

const DetailDiv = styled.li`
  a {
    background: ${({ $isDetailOpen }) => ($isDetailOpen ? '#BBE1FA' : '#DBE2EF')};
    border: 1px solid ${({ $isDetailOpen }) => ($isDetailOpen ? '#3282B8' : '#DBE2EF')};
    color: ${({ $isDetailOpen }) => ($isDetailOpen ? '#3282B8' : '#535353')};
    font-weight: ${({ $isDetailOpen }) => ($isDetailOpen ? '700' : '400')};
  }
  div {
    display: ${({ $isDetailOpen }) => ($isDetailOpen ? 'block' : 'none')};
  }
`;
const MapDiv = styled.li`
  a {
    background: ${({ $isMapOpen }) => ($isMapOpen ? '#BBE1FA' : '#DBE2EF')};
    border: 1px solid ${({ $isMapOpen }) => ($isMapOpen ? '#3282B8' : '#DBE2EF')};
    color: ${({ $isMapOpen }) => ($isMapOpen ? '#3282B8' : '#535353')};
    font-weight: ${({ $isMapOpen }) => ($isMapOpen ? '700' : '400')};
  }

  div {
    display: ${({ $isMapOpen }) => ($isMapOpen ? 'block' : 'none')};
  }
`;
