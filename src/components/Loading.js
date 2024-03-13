import React from 'react';
import styled from 'styled-components';

function LoadingBar({ size, marginTop }) {
  return (
    <Wrap $marginTop={marginTop}>
      <Loading $size={size}></Loading>
    </Wrap>
  );
}

export default LoadingBar;

const Wrap = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  margin-top: ${({ $marginTop }) => $marginTop || '0'};
`;

const Loading = styled.div`
  height: ${({ $size }) => $size || '200px'};
  width: ${({ $size }) => $size || '200px'};
  border: 12px solid ${({ theme }) => theme.colors.gray};
  border-radius: 50%;
  border-right-color: ${({ theme }) => theme.colors.blue};
  animation: spin 1s ease infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
