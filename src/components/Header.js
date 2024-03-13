import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Search from './Search';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const handleSearch = () => {
    setShowSearch((prev) => !prev);
  };
  const goToSearchPage = () => {
    setShowSearch(false);
    navigate('/search');
  };
  return (
    <Container>
      <Inner>
        <Logo>
          <a href="/">
            <img alt="Logo" src={process.env.PUBLIC_URL + '/logo192.png'} />
          </a>
        </Logo>
        <Nav>
          <a href="/">회원가입</a>
          <a href="/">로그인</a>
        </Nav>
        <SearchBtn onClick={handleSearch}>
          {!showSearch ? <FontAwesomeIcon icon={faMagnifyingGlass} /> : <FontAwesomeIcon icon={faX} />}
        </SearchBtn>
      </Inner>
      <Search showSearch={showSearch} goToSearchPage={goToSearchPage} />
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  z-index: 3;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 36px;
  box-sizing: border-box;
  display: flex;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-grow: 1;
`;

const Logo = styled.div`
  flex-grow: 1;
  z-index: 5;
  a {
    cursor: pointer;
  }
  img {
    width: 60px;
    transition: all 0.5s;
  }

  img:hover {
    transform: scale(1.2);
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;

  a {
    font-size: 16px;
    line-height: 24px;
    cursor: pointer;
  }
`;

const SearchBtn = styled.a`
  z-index: 5;
`;
