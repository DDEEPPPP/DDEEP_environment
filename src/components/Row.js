import axios from '../api/axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Row = ({ title, id, url, data }) => {
  // const [festivals, setFestivals] = useState([]); 추후 group별로 api 받아오기 현재는 mockData MainPage에서 props로 받아옴 배열 5개로 끊기
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getRandomArray = (array, num) => {
    if (array.length <= num) {
      return array.slice();
    }
    const shuffleArray = array.slice().sort(() => 0.5 - Math.random());
    return shuffleArray.slice(0, num);
  };

  const isOpenCheck = (array) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}${month}${day}`;
    const eventState = array.map((data) => {
      const isOpen = date >= data.eventstartdate && date <= data.eventenddate;
      return {
        ...data,
        isOpen,
      };
    });
    return eventState;
  };

  const fetchInfoData = useCallback(async () => {
    try {
      let response;
      let params = {
        numOfRows: '20',
        areaCode: '39',
      };
      if (id === 'RM') {
        params = {
          ...params,
          contentTypeId: '12',
        };
      }
      if (id === 'CC') {
        params = {
          ...params,
          contentTypeId: '14',
        };
      }
      if (id === 'FV') {
        params = {
          ...params,
          eventStartDate: '19900101',
        };
      }
      response = await axios.get(url, { params });
      const datasArray = response?.data?.response?.body?.items?.item || [];
      const shuffleDatas = getRandomArray(datasArray, 5);
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
  }, [url]);

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
        <a>전체보기</a>
      </RowHeader>
      <Content id={id}>
        {/* map돌리기 */}
        {datas.map((data) => (
          <Wrap key={data.contentid}>
            <div onClick={() => navigate(`${url}/${data.contentid}`)}>
              <Image>
                {data.firstimage ? (
                  <img src={data.firstimage} />
                ) : (
                  <img src={process.env.PUBLIC_URL + '/Noimage.jpg'} />
                )}

                {url === '/searchFestival1' && (
                  <State $isState={data.isOpen}>{data.isOpen ? '진행중' : '진행 완료'}</State>
                )}
              </Image>
              <Text>
                <h3>{data.title}</h3>
                {url === '/searchFestival1' && (
                  <span>
                    {data.eventstartdate} ~ {data.eventenddate}
                  </span>
                )}
                <span>{data.addr1}</span>
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
  a {
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 /73%) 0px 16px 10px -10px;
  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
  margin-right: 2%;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    transform: scale(0.98);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  }
`;

const Image = styled.div`
  height: 245px;
  position: relative;
  overflow: hidden;

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
  gap: 4px;
`;

const State = styled.span`
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
  background-color: ${({ $isState }) => ($isState ? 'rgb(0, 204, 51)' : 'rgb(204, 0, 51)')};
  font-size: 12px;
  font-weight: 800;
  line-height: 24px;
  text-shadow: none;
  position: absolute;
  top: 8px;
  left: 12px;
`;
