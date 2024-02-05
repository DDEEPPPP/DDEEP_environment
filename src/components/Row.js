import React, { useState } from 'react';
import styled from 'styled-components';

const Row = ({ title, id, data }) => {
  // const [festivals, setFestivals] = useState([]); 추후 group별로 api 받아오기 현재는 mockData MainPage에서 props로 받아옴 배열 5개로 끊기
  console.log(data);
  return (
    <Container>
      <h2>{title}</h2>
      <Content>
        {/* map돌리기 */}
        {data.map((data) => (
          <Wrap>
            <a>
              <Image>
                <img src={data.image} />
                <State $isState={data.state}>{data.state}</State>
              </Image>
              <Text>
                <h3>{data.title}</h3>
                <span>{data.date}</span>
                <span>{data.place}</span>
              </Text>
            </a>
          </Wrap>
        ))}
      </Content>
    </Container>
  );
};

export default Row;

const Container = styled.div`
  padding: 0 0 26px;
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

  a {
    height: 60%;
  }

  &:hover {
    transform: scale(0.98);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  }
`;

const Image = styled.div`
  height: 245px;
  position: relative;
  overflow: hidden;
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
  background-color: ${({ $isState }) => ($isState === '개최중' ? 'rgb(0, 204, 51)' : 'rgb(204, 0, 51)')};
  font-size: 12px;
  font-weight: 800;
  line-height: 24px;
  text-shadow: none;
  position: absolute;
  top: 8px;
  left: 12px;
`;
