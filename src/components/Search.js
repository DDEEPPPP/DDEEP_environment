import React, { useCallback, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { setCat1, setKeyword } from '../store/searchParams';
import { useNavigate } from 'react-router-dom';

const Search = ({ showSearch }) => {
  const navigate = useNavigate();
  // radio 선택시 전달할 파라미터 변경
  const [selectedContentType, setSelectedContentType] = useState('');
  const handleContentType = (event) => {
    setSelectedContentType(event.target.value);
  };
  // 한번 더 클릭시 체크 해제
  const checkOutRadio = (event) => {
    const clickedValue = event.target.value;
    setSelectedContentType((prev) => (prev === clickedValue ? '' : clickedValue));
  };

  // 검색어 입력 확인 , url인코딩
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (event) => {
    const encoded = encodeURIComponent(event.target.value);
    setSearchValue(encoded);
  };

  // 검색 시 전달할 파라미터 redux store에 저장
  const dispatch = useDispatch();
  const setCategory = () => {
    dispatch(setCat1(selectedContentType));
  };
  const setKeywords = () => {
    dispatch(setKeyword(searchValue));
  };
  const goSearchPage = useCallback(
    (event) => {
      event.preventDefault();
      setCategory();
      navigate('search');
    },
    [dispatch]
  );

  return (
    <SearchSection $showSearch={showSearch}>
      <div>
        <SearchForm onSubmit={goSearchPage}>
          <SearchInput placeholder="검색어를 입력하세요." type="text" onChange={handleSearch} />
          <SearchIcon>
            <FontAwesomeIcon icon={faMagnifyingGlass} type="submit" onClick={goSearchPage} />
          </SearchIcon>
        </SearchForm>
        <SelectForm>
          <input
            type="radio"
            value="A01"
            id="A01"
            checked={selectedContentType === 'A01'}
            onChange={handleContentType}
            onClick={checkOutRadio}
          />
          <label htmlFor="A01">자연</label>
          <input
            type="radio"
            value="A02"
            id="A02"
            checked={selectedContentType === 'A02'}
            onChange={handleContentType}
            onClick={checkOutRadio}
          />
          <label htmlFor="A02">인문(문화/예술/역사)</label>
          <input
            type="radio"
            value="A03"
            id="A03"
            checked={selectedContentType === 'A03'}
            onChange={handleContentType}
            onClick={checkOutRadio}
          />
          <label htmlFor="A03">레포츠</label>
          <input
            type="radio"
            value="A04"
            id="A04"
            checked={selectedContentType === 'A04'}
            onChange={handleContentType}
            onClick={checkOutRadio}
          />
          <label htmlFor="A04">쇼핑</label>
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
    box-sizing: border-box;
    &:hover {
      color: ${({ theme }) => theme.colors.hover};
      border-color: ${({ theme }) => theme.colors.hover};
      background-color: ${({ theme }) => theme.colors.base};
      font-weight: 600;
    }
  }
  input[type='radio']:checked + label {
    color: ${({ theme }) => theme.colors.hover};
    border-color: ${({ theme }) => theme.colors.hover};
    background-color: ${({ theme }) => theme.colors.base};
    font-weight: 600;
  }
`;
