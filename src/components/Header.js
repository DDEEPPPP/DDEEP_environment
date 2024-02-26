import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <Inner>
        <Logo href="/">
          <img alt="Logo" onClick={() => (window.location.href = '/')} />
          로고
        </Logo>
        <Nav>
          <a href="#">관광지</a>
          <a href="#">행사</a>
          <a href="#">회원가입</a>
        </Nav>
      </Inner>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  width: 100%;
  border-bottom: 1px solid #d5d5d5;
  z-index: 3;
  background-color: #fff;
  display: flex;
  padding: 0 36px;
  box-sizing: border-box;
`;

const Inner = styled.div`
  margin: 0 auto;
  width: 1290px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.a``;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;

  a {
    font-size: 16px;
    line-height: 24px;
  }
`;
