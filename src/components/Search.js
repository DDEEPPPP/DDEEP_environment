import React from 'react';
import styled from 'styled-components';

const Search = () => {
  return (
    <SearchSection>
      <SearchInput placeholder="검색어를 입력하세요." />
      <SearchIcon />
    </SearchSection>
  );
};

export default Search;

const SearchSection = styled.section``;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  position: relative;
`;

const SearchIcon = styled.button``;
