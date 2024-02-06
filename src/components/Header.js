import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <Logo href="/">
        <img alt="Logo" onClick={() => (window.location.href = '/')} />
        로고
      </Logo>
      <Nav>
        <a href="#">관광지</a>
        <a href="#">행사</a>
        <a href="#">회원가입</a>
      </Nav>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #d5d5d5;
  z-index: 3;
  background-color: #fff;
  padding: 36px;
  box-sizing: border-box;
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
