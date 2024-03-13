import axios from '../api/axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import request from '../api/request';
import { useFilterCate } from '../hooks/useFilterCate';
import FilterRadioButtons from './FilterRadioButtons';

function Filter({ showFilter }) {
  const [cat2List, setCat2List] = useState([]);
  const [cat3List, setCat3List] = useState([]);
  const [cat1, handleCat1, checkedOutCat1] = useFilterCate('');
  const [cat2, handleCat2, checkedOutCat2] = useFilterCate('');
  const [cat3, handleCat3, checkedOutCat3] = useFilterCate('');

  // Cat1 설정 시 Cat2 불러오기
  const setFilterCat1 = useCallback(async () => {
    try {
      if (!cat1) {
        setCat2List([]);
        return;
      }

      const params = {
        cat1,
      };

      const response = await axios.get(request.fetchCategoty, { params });
      const cat2Array = response?.data?.response?.body?.items?.item || [];
      setCat2List(cat2Array);
      // Cat1 값 변경 시 Cat3리스트 초기화
      setCat3List([]);
    } catch (error) {
      console.log(error);
    }
  }, [cat1]);

  useEffect(() => {
    setFilterCat1();
  }, [cat1]);

  // Cat2 설정 시 Cat3 불러오기
  const setFilterCat2 = useCallback(async () => {
    try {
      if (!cat2) {
        return;
      }

      const params = {
        cat1,
        cat2,
      };

      const response = await axios.get(request.fetchCategoty, { params });
      const cat3Array = response?.data?.response?.body?.items?.item || [];
      setCat3List(cat3Array);
    } catch (error) {
      console.log(error);
    }
  }, [cat1, cat2]);

  useEffect(() => {
    setFilterCat2();
  }, [cat2]);

  console.log('cat1: ', cat1, 'cat2: ', cat2, 'cat3: ', cat3);
  console.log('cat2List: ', cat2List);
  console.log('cat3List: ', cat3List);

  return (
    <FilterSection $showFilter={!showFilter}>
      <CateSection>
        <FilterRadioButtons
          options={[
            { rnum: 1, code: 'A01', name: '자연' },
            { rnum: 2, code: 'A02', name: '인문(문화/예술/역사)' },
            { rnum: 3, code: 'A03', name: '레포츠' },
            { rnum: 4, code: 'A04', name: '쇼핑' },
          ]}
          currentValue={cat1}
          onChange={handleCat1}
          onClick={checkedOutCat1}
        />
      </CateSection>
      <CateSection>
        <FilterRadioButtons options={cat2List} currentValue={cat2} onChange={handleCat2} onClick={checkedOutCat2} />
      </CateSection>
      <CateSection>
        <FilterRadioButtons options={cat3List} currentValue={cat3} onChange={handleCat3} onClick={checkedOutCat3} />
      </CateSection>
      <button>검색</button>
    </FilterSection>
  );
}

export default Filter;

const FilterSection = styled.div`
  background-color: orange;
  transition: all 0.2s;
  ${({ $showFilter }) =>
    $showFilter &&
    css`
      visibility: visible;
      opacity: 1;
      height: 200px;
    `};

  ${({ $showFilter }) =>
    !$showFilter &&
    css`
      visibility: hidden;
      opacity: 0;
      height: 0;
    `};
`;

const CateSection = styled.div`
  /* display: flex;
  padding: 20px;
  padding-bottom: 0;

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
  } */
`;
