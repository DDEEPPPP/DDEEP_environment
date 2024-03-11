import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import LoadingBar from './Loading';

const Banner = ({ url }) => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHover, setIsHover] = useState(0);

  // 가져온 데이터 배열 랜덤으로  섞기
  const getRandomArray = (array, num) => {
    if (array.length <= num) {
      return array.slice();
    }
    const shuffleArray = array.slice().sort(() => 0.5 - Math.random());
    return shuffleArray.slice(0, num);
  };

  // 현재 진행중인지 확인
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
  // 현재 진행중인 축제를 배너에 띄우기
  useEffect(() => {
    const fetchFestivalData = async () => {
      try {
        let response;
        let params = {
          numOfRows: '9999',
          areaCode: '39',
          eventStartDate: '19900101',
        };
        response = await axios.get(url, { params });
        const festivalsArray = response?.data?.response?.body?.items?.item || [];
        const openState = isOpenCheck(festivalsArray);
        const openFestivals = openState.filter((data) => data.isOpen === true);
        const shuffleFestivals = getRandomArray(openFestivals, 3);
        setFestivals(shuffleFestivals);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFestivalData();
  }, [url]);

  const onMouseOver = (index) => {
    setIsHover(index);
  };

  return (
    <Wrap>
      {loading ? (
        <LoadingBar />
      ) : (
        <Slides>
          {festivals.map((festival, index) => {
            return (
              <Slide
                key={festival.contentid}
                onMouseOver={() => onMouseOver(index)}
                className={isHover === index ? 'active' : ''}
              >
                <a
                  href={`${url}/${festival.contentid}`}
                  style={{
                    backgroundImage: festival.firstimage
                      ? `url(${festival.firstimage})`
                      : `url(${process.env.PUBLIC_URL}/Noimage.jpg)`,
                  }}
                >
                  <div className="text-area">
                    <div>
                      <State $isState={festival.isOpen} $closeDate={festival.closeDate}>
                        {festival.isOpen || !festival.closeDate ? '진행중' : '진행 완료'}
                      </State>
                      <strong>{festival.title}</strong>
                    </div>
                    <div className="text-desc">
                      <span>
                        {festival.openDate} ~ {festival.closeDate ? festival.closeDate : '상시 진행중'}
                      </span>
                      <span>{festival.addr1}</span>
                      <span></span>
                    </div>
                  </div>
                </a>
              </Slide>
            );
          })}
        </Slides>
      )}
    </Wrap>
  );
};

export default Banner;

const Wrap = styled.section`
  max-width: 928px;
  margin: 10px auto 30px;
  box-sizing: border-box;
`;

const Slides = styled.ul`
  list-style: none;
  height: 380px;
`;

const Slide = styled.li`
  &.active {
    width: 64%;
  }

  height: 100%;
  float: left;
  width: 16%;
  margin-left: calc(4% / 3);
  border-radius: 8px;
  transition: all 0.1s;

  a {
    cursor: pointer;
    overflow: hidden;
    display: block;
    border-radius: 8px;
    position: relative;
    background: no-repeat 50% 0 / cover;
    height: 100%;
    color: #fff;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.6);
  }

  div.text-area {
    position: absolute;
    left: 50%;
    top: 66px;
    width: 100%;
    transform: translateX(-50%) rotate(90deg);
  }

  div.text-desc span {
    display: block;
    padding-top: 8px;
    font-size: 18px;
    line-height: 20px;
    font-weight: 600;
  }

  &.active div.text-area {
    left: 7%;
    top: 48%;
    width: 90%;
    margin-left: 0;
    transform: unset;
  }

  div.text-desc {
    display: none;
  }

  &.active div.text-desc {
    display: block;
  }

  strong {
    padding-top: 12px;
    font-weight: 600;
    display: block;
  }

  &.active strong {
    font-size: 28px;
    line-height: 36px;
  }

  &::after {
    content: '';
    clear: both;
    display: block;
  }
`;

const State = styled.span`
  color: ${({ theme }) => theme.colors.white};
  padding: 5px 8px;
  border-radius: 4px;
  background-color: ${({ $isState, $closeDate, theme }) =>
    $isState || !$closeDate ? theme.colors.green : theme.colors.red};
  font-size: 12px;
  font-weight: 800;
  line-height: 24px;
  text-shadow: none;
`;
