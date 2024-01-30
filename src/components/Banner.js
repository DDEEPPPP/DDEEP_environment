import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { getFestival } from '../api/testapi/get/getFestival';

const Banner = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHover, setIsHover] = useState(0);

  useEffect(() => {
    const fetchFestivalData = async () => {
      try {
        const response = await getFestival();
        setFestivals(response.filter((festivals) => festivals.state === '개최중'));
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFestivalData();
  }, []);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  if (festivals.length > 3) {
    const shuffledFestivals = [...festivals];
    shuffle(shuffledFestivals);
    setFestivals(festivals.slice(0, 3));
  }

  const onMouseOver = (index) => {
    setIsHover(index);
  };

  return (
    <Wrap>
      {loading ? (
        <p>로딩중</p>
      ) : (
        <Slides>
          {festivals.map((festival, index) => {
            return (
              <Slide
                key={festival.id}
                onMouseOver={() => onMouseOver(index)}
                className={isHover === index ? 'active' : ''}
              >
                <a href="#" style={{ backgroundImage: `url(${festival.image})` }}>
                  <div className="text-area">
                    <div>
                      <span className="state">{festival.state}</span>
                      <strong>{festival.title}</strong>
                    </div>
                    <div className="text-desc">
                      <span>{festival.date}</span>
                      <span>{festival.place}</span>
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
  margin: 0 auto;
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
    overflow: hidden;
    display: block;
    border-radius: 8px;
    position: relative;
    background: no-repeat 50% 0 / cover;
    height: 100%;
    color: #fff;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.6);
  }
  span.state {
    padding: 5px 8px;
    border-radius: 4px;
    background-color: rgb(0, 204, 51);
    font-size: 12px;
    font-weight: 800;
    line-height: 24px;
    text-shadow: none;
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
