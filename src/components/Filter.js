import axios from '../api/axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import request from '../api/request';
import { useFilterCate } from '../hooks/useFilterCate';
import FilterRadioButtons from './FilterRadioButtons';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory1Action, setCategory2Action, setCategory3Action } from '../store/listFilterParams';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faRotateRight } from '@fortawesome/free-solid-svg-icons';

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
        setCat3List([]);

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

  // Category 값 store 저장
  const dispatch = useDispatch();
  const setCategory1 = (value) => {
    dispatch(setCategory1Action(value));
  };
  const setCategory2 = (value) => {
    dispatch(setCategory2Action(value));
  };
  const setCategory3 = (value) => {
    dispatch(setCategory3Action(value));
  };

  const submitCategories = useCallback(() => {
    setCategory1(cat1);
    setCategory2(cat2);
    setCategory3(cat3);
  }, [dispatch, cat1, cat2, cat3]);

  const resetCategories = useCallback(() => {
    setCategory1('');
    setCategory2('');
    setCategory3('');
    handleCat1('');
    handleCat2('');
    handleCat3('');
  }, [handleCat1, handleCat2, handleCat3]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submitCategories();
      }}
    >
      <FilterSection $showFilter={showFilter}>
        <CateSection>
          <FilterRadioButtons
            options={[
              { rnum: 1, code: 'A01', name: '자연' },
              { rnum: 2, code: 'A02', name: '인문(문화/예술/역사)' },
              { rnum: 3, code: 'A03', name: '레포츠' },
              { rnum: 4, code: 'A04', name: '쇼핑' },
            ]}
            currentValue={cat1}
            onChange={(event) => {
              handleCat1(event.target.value);
              handleCat2('');
              handleCat3('');
            }}
            onClick={checkedOutCat1}
          />
        </CateSection>
        <CateSection>
          <FilterRadioButtons
            options={cat2List}
            currentValue={cat2}
            onChange={(event) => {
              handleCat2(event.target.value);
              handleCat3('');
            }}
            onClick={checkedOutCat2}
          />
        </CateSection>
        <CateSection>
          <FilterRadioButtons
            options={cat3List}
            currentValue={cat3}
            onChange={(event) => {
              handleCat3(event.target.value);
            }}
            onClick={checkedOutCat3}
          />
        </CateSection>
        <BtnGroup>
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <button onClick={resetCategories}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </BtnGroup>
      </FilterSection>
    </form>
  );
}

export default Filter;

const FilterSection = styled.div`
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
  display: flex;
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
  }
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    border: 1px solid ${({ theme }) => theme.colors.gray};
    background: transparent;
    padding: 8px 16px;
    border-radius: 15px;
    cursor: pointer;
  }

  button:hover {
    color: ${({ theme }) => theme.colors.hover};
    border-color: ${({ theme }) => theme.colors.hover};
    background-color: ${({ theme }) => theme.colors.base};
  }
`;
