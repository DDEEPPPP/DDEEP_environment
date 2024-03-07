import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Card({ url, data }) {
  const navigate = useNavigate();
  return (
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
  );
}

export default Card;

const Wrap = styled.div`
  height: 350px;
  width: 250px;
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
