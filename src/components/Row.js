import axios from '../api/axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Row = ({ title, id, url, data }) => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  // 가져온 데이터 배열 랜덤으로  섞기
  const getRandomArray = (array, num) => {
    if (array.length <= num) {
      return array.slice();
    }
    const shuffleArray = array.slice().sort(() => 0.5 - Math.random());
    return shuffleArray.slice(0, num);
  };
  // 축제, 플리마켓 등 오픈 날짜 확인하기
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
        <a href="#">more</a>
      </RowHeader>
      <Content id={id}>
        {/* map돌리기 */}
        {datas.map((data) => (
          <Wrap key={data.contentid}>
            <div onClick={() => navigate(`${url}/${data.contentid}`)}>
              <Image>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {data.firstimage ? (
                  <img src={data.firstimage} alt="장소 이미지" />
                ) : (
                  <img src={process.env.PUBLIC_URL + '/Noimage.jpg'} alt="대체 이미지" />
                )}

                {url === '/searchFestival1' && (
                  <State $isState={data.isOpen} $closeDate={data.closeDate}>
                    {data.isOpen || !data.closeDate ? '진행중' : '진행 완료'}
                  </State>
                )}
              </Image>
              <Text>
                <h3 style={{ fontSize: data.title.length > 10 ? '14px' : '16px' }}>{data.title}</h3>
                {url === '/searchFestival1' && (
                  <h4>
                    {data.openDate} ~ {data.closeDate ? data.closeDate : '상시 진행중'}
                  </h4>
                )}
                <h4>{data.addr1}</h4>
              </Text>
            </div>
          </Wrap>
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

const Wrap = styled.div`
  height: 350px;
  flex: 1 0 0;
  /* box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 /73%) 0px 16px 10px -10px; */
  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
  transition: all 0.25s;
  padding: 7px;
  /* background: ${({ theme }) => theme.colors.gray}; */
  position: relative;

  color: ${({ theme }) => theme.colors.gray2};

  &:hover {
    /* transform: scale(0.98); */
    /* background: ${({ theme }) => theme.colors.blue}; */
    /* color: ${({ theme }) => theme.colors.white}; */
    /* box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px; */
  }
  & > div > div > span:nth-child(1) {
    position: absolute;
    border-top: 5px solid ${({ theme }) => theme.colors.hover};
    top: 0;
    left: 0;
    right: 100%;
    transition: 0.1s;
  }

  &:hover > div > div > span:nth-child(1) {
    right: 0;
  }

  & > div > div > span:nth-child(2) {
    position: absolute;
    border-right: 5px solid ${({ theme }) => theme.colors.hover};
    top: 0;
    right: 0;
    bottom: 100%;
    transition: 0.1s;
  }

  &:hover > div > div > span:nth-child(2) {
    bottom: 0;
  }

  & > div > div > span:nth-child(3) {
    position: absolute;
    border-bottom: 5px solid ${({ theme }) => theme.colors.hover};
    bottom: 0;
    left: 100%;
    right: 0;
    transition: 0.1s;
  }

  &:hover > div > div > span:nth-child(3) {
    left: 0;
  }
  & > div > div > span:nth-child(4) {
    position: absolute;
    border-left: 5px solid ${({ theme }) => theme.colors.hover};
    top: 100%;
    left: 0;
    bottom: 0;
    transition: 0.1s;
  }

  &:hover > div > div > span:nth-child(4) {
    top: 0;
  }
`;

const Image = styled.div`
  height: 245px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  img {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;

const Text = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  h3 {
    font-weight: 700;
  }

  h4 {
    font-size: 13px;
  }
`;

const State = styled.span`
  color: ${({ theme }) => theme.colors.white};
  padding: 2px 5px;
  border-radius: 4px;
  background-color: ${({ $isState, $closeDate, theme }) =>
    $isState || !$closeDate ? theme.colors.green : theme.colors.red};
  font-size: 12px;
  font-weight: 800;
  line-height: 24px;
  text-shadow: none;
  position: absolute;
  top: 8px;
  left: 12px;
`;
