import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import request from '../api/request';

const Search = ({ showSearch }) => {
  // radio 선택시 전달할 파라미터 변경
  const [selectedContentType, setSelectedContentType] = useState('');
  const handleContentType = (event) => {
    setSelectedContentType(event.target.value);
  };

  // 검색어 입력 확인 , url인코딩
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (event) => {
    const encoded = encodeURIComponent(event.target.value);
    setSearchValue(encoded);
  };
  console.log(selectedContentType);

  return (
    <SearchSection $showSearch={showSearch}>
      <div>
        <SearchForm>
          <SearchInput placeholder="검색어를 입력하세요." type="text" value={searchValue} onChange={handleSearch} />
          <SearchIcon>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </SearchIcon>
        </SearchForm>
        <SelectForm>
          <label>
            <input type="radio" value="A01" checked={selectedContentType === 'A01'} onChange={handleContentType} />
            자연
          </label>
          <label>
            <input type="radio" value="A02" checked={selectedContentType === 'A02'} onChange={handleContentType} />
            인문(문화/예술/역사)
          </label>
          <label>
            <input type="radio" value="A03" checked={selectedContentType === 'A03'} onChange={handleContentType} />
            레포츠
          </label>
          <label>
            <input type="radio" value="A04" checked={selectedContentType === 'A04'} onChange={handleContentType} />
            쇼핑
          </label>
        </SelectForm>
      </div>
    </SearchSection>
  );
};

export default Search;

const SearchSection = styled.div`
  position: absolute;
  top: -470px;
  left: 0;
  width: 100%;
  transition: 0.4s;
  padding: 130px 0 130px;
  background-color: ${({ theme }) => theme.colors.basedGray};
  z-index: 4;
  div {
    max-width: 768px;
    border-radius: 10px;
    margin: 0 auto;
  }

  ${({ $showSearch }) =>
    $showSearch &&
    css`
      top: 0;
      visibility: visible;
      opacity: 1;
    `};

  ${({ $showSearch }) =>
    !$showSearch &&
    css`
      visibility: hidden;
      opacity: 0;
    `}
`;

const SearchInput = styled.input`
  width: 93%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  position: relative;
  margin-bottom: 20px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.hover};
  color: ${({ theme }) => theme.colors.gray};
  font-size: 20px;
  font-weight: 600;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    padding-left: 8px;
  }
`;

const SearchForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIcon = styled.button`
  position: absolute;
  right: 30px;
  top: 10px;
  width: 30px;
  height: 30px;
  font-size: 20px;
  border: none;
  color: ${({ theme }) => theme.colors.gray};
  background: none;
  cursor: pointer;
`;

const SelectForm = styled.form`
  margin-left: 20px;
  input[type='radio'] {
    display: none;
  }

  label {
    color: ${({ theme }) => theme.colors.gray2};
    font-size: 15px;
    font-weight: 400;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 15px;
    padding: 8px 16px;
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
  }

  label:hover {
    color: ${({ theme }) => theme.colors.hover};
    border-color: ${({ theme }) => theme.colors.hover};
    background-color: ${({ theme }) => theme.colors.base};
    font-weight: 600;
  }
`;
