import axios from '../api/axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';

const Row = ({ title, id, url }) => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  // 가져온 데이터 배열 랜덤으로  섞기
  const getRandomArray = (array, num) => {
    if (array.length <= num) {
      return array.slice();
    }
    const shuffleArray = array.slice().sort(() => 0.5 - Math.random());
    return shuffleArray.slice(0, num);
  };
  //축제, 플리마켓 등 오픈 날짜 확인하기
  const isOpenCheck = (array) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}${month}${day}`;
    const eventState = array.map((data) => {
      const isOpen = date >= data.eventstartdate && date <= data.eventenddate;
      const openDate = `${data.eventstartdate.slice(0, 4)}년 ${data.eventstartdate.slice(
        4,
        6
      )}월 ${data.eventstartdate.slice(6, 8)}일`;
      let closeDate;
      if (data.eventenddate) {
        closeDate = `${data.eventenddate.slice(0, 4)}년 ${data.eventenddate.slice(4, 6)}월 ${data.eventenddate.slice(
          6,
          8
        )}일`;
      }
      return {
        ...data,
        isOpen,
        openDate,
        closeDate,
      };
    });
    return eventState;
  };
  // TourAPI 4.0 데이터 받아오기
  const fetchInfoData = useCallback(async () => {
    try {
      let response;
      let params = {
        // 20개를 가져와서 getRandomArray함수로 섞기
        numOfRows: '20',
        // 지역코드 제주
        areaCode: '39',
      };
      if (id === 'RM') {
        params = {
          ...params,
          // 관광명소
          contentTypeId: '12',
        };
      }
      if (id === 'CC') {
        params = {
          ...params,
          // 문화시설
          contentTypeId: '14',
        };
      }
      if (id === 'FV') {
        params = {
          ...params,
          // 축제 필수 파라미터 시작날짜
          eventStartDate: '19900101',
        };
      }
      response = await axios.get(url, { params });
      const datasArray = response?.data?.response?.body?.items?.item || [];
      const shuffleDatas = getRandomArray(datasArray, 5);
      // 축제일때 현재 날짜 오픈 체크
      if (id === 'FV') {
        const openState = isOpenCheck(shuffleDatas);
        setDatas(openState);
      } else {
        setDatas(shuffleDatas);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [url, id]);

  useEffect(() => {
    (async () => {
      await fetchInfoData();
    })();
  }, [fetchInfoData]);

  if (loading) {
    return <div>로딩중</div>;
  }
  return (
    <Container>
      <RowHeader>
        <h2>{title}</h2>
        <a href={`/list${url}/${id}/1`}>more</a>
      </RowHeader>
      <Content id={id}>
        {/* map돌리기 */}
        {datas.map((data) => (
          <Card url={url} data={data} key={data.contentid} />
        ))}
      </Content>
    </Container>
  );
};

export default Row;

const Container = styled.section`
  padding: 0 0 26px;
  margin-top: 10px;
`;

const RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  padding-bottom: 8px;
  h2 {
    font-size: 18px;
    font-weight: 700;
  }
  a {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray2};
  }
`;

const Content = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
  gap: 40px;
  /* background: ${({ theme }) => theme.colors.base}; */
`;
