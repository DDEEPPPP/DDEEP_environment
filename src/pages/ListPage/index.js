import axios from '../../api/axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import request from '../../api/request';
import Card from '../../components/Card';
import PageSelect from '../../components/PageSelect';

import LoadingBar from '../../components/Loading';
import Filter from '../../components/Filter';
import { faArrowDownShortWide, faArrowUpShortWide } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

function ListPage() {
  // Filter 컴포넌트 on/off
  const [showFilter, setShowFilter] = useState(false);
  const handleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const [listDatas, setListDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  // totalPage 계산
  const [totalPage, setTotalPage] = useState('');

  //URL에서 fetchType , typeId 가져오기
  const { contentType, typeId, pageNo } = useParams();

  //축제, 플리마켓 등 오픈 날짜 확인하기
  const isOpenCheck = (array) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}${month}${day}`;
    const eventState = array.map((data) => {
      const isOpen = date >= data.eventstartdate && date <= data.eventenddate;
      const openDate = `${data.eventstartdate.slice(0, 4)}년 ${data.eventstartdate.slice(
        4,
        6
      )}월 ${data.eventstartdate.slice(6, 8)}일`;
      let closeDate;
      if (data.eventenddate) {
        closeDate = `${data.eventenddate.slice(0, 4)}년 ${data.eventenddate.slice(4, 6)}월 ${data.eventenddate.slice(
          6,
          8
        )}일`;
      }
      return {
        ...data,
        isOpen,
        openDate,
        closeDate,
      };
    });
    return eventState;
  };

  const filterParams = useSelector((state) => state.listFilterParams.params);

  //가져온 fetchType, typeId 에 따라 API호출
  const fetchList = useCallback(async () => {
    setLoading(false);
    try {
      let response;
      let params = { areaCode: '39', numOfRows: '9999' };
      if (typeId === 'RM') {
        params = {
          ...params,
          ...filterParams,
          // 관광명소
          contentTypeId: '12',
        };
      }
      if (typeId === 'CC') {
        params = {
          ...params,
          ...filterParams,

          // 문화시설
          contentTypeId: '14',
        };
      }
      if (typeId === 'FV') {
        params = {
          // 축제 필수 파라미터 시작날짜
          eventStartDate: '19900101',
        };
      }

      response = await axios.get(`/${contentType}`, { params });
      const datasArray = response?.data?.response?.body?.items?.item || [];
      // 축제일때 현재 날짜 오픈 체크
      if (typeId === 'FV') {
        const openState = isOpenCheck(datasArray);
        setListDatas(openState);
        //totalPage 계산해서 할당
        setTotalPage(Math.ceil(openState.length / 10));
      } else {
        setListDatas(datasArray);
        //totalPage 계산해서 할당
        setTotalPage(Math.ceil(datasArray.length / 10));
      }
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }, [contentType, typeId, pageNo, filterParams]);
  // 페이지 이동 함수
  const navigate = useNavigate();
  const onPageChange = (newPage) => {
    navigate(`/list/${contentType}/${typeId}/${newPage}`);
  };

  // ListDatas 한 페이지당 10개씩 보이기
  const sliceListDatas = (datasArray, pageNo, numOfItems) => {
    const startSlice = (pageNo - 1) * numOfItems;
    const endSlice = startSlice + numOfItems;
    const sliceDatasArray = datasArray.slice(startSlice, endSlice);
    return sliceDatasArray;
  };

  useEffect(() => {
    (async () => {
      await fetchList();
      setListDatas((prev) => sliceListDatas(prev, pageNo, 10));
    })();
  }, [fetchList]);
  useEffect(() => {
    setListDatas((prev) => sliceListDatas(prev, pageNo, 10));
  }, [pageNo]);
  return (
    <Wrap>
      <SideMenu>
        <ul>
          <MenuTitle $onPage={typeId === 'FV'} href={`/list${request.fetchFestivals}/FV/1`}>
            <li>페스티벌</li>
          </MenuTitle>
          <MenuTitle $onPage={typeId === 'RM'} href={`/list${request.fetchAreaBased}/RM/1`}>
            <li>관광명소</li>
          </MenuTitle>
          <MenuTitle $onPage={typeId === 'CC'} href={`/list${request.fetchAreaBased}/CC/1`}>
            <li>문화시설</li>
          </MenuTitle>
          <MenuTitle $onPage={typeId === 'FM'} href={`/list${request.fetchAreaBased}/FM/1`}>
            <li>플리마켓</li>
          </MenuTitle>
          <MenuTitle $onPage={typeId === 'PS'} href={`/list${request.fetchFestivals}/PS/1`}>
            <li>팝업스토어</li>
          </MenuTitle>
        </ul>
      </SideMenu>
      <MainContainer>
        {typeId === 'FV' ? (
          <></>
        ) : (
          <FilterContainer>
            <FilterBtn onClick={handleFilter}>
              {showFilter ? (
                <FontAwesomeIcon icon={faArrowDownShortWide} />
              ) : (
                <FontAwesomeIcon icon={faArrowUpShortWide} />
              )}
            </FilterBtn>
            <Filter showFilter={showFilter} />
          </FilterContainer>
        )}
        {loading ? (
          <>
            <CardSection>
              {listDatas.map((data) => (
                <Card url={`/${contentType}`} data={data} key={data.contentid} />
              ))}
            </CardSection>
            <PageSelect onPageChange={onPageChange} currentPage={parseInt(pageNo)} totalPages={totalPage} />
          </>
        ) : (
          <LoadingBar marginTop="150px" />
        )}
      </MainContainer>
    </Wrap>
  );
}

export default ListPage;

const Wrap = styled.section`
  margin-top: 70px;
  display: flex;
`;
const SideMenu = styled.div`
  width: 10%;
  border-right: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 15px 10px 0;
  background: ${({ theme }) => theme.colors.white};
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const MenuTitle = styled.a`
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ $onPage, theme }) => ($onPage ? theme.colors.blue : theme.colors.white)};
  padding: 10px 20px 10px 30px;
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;
  li {
    color: ${({ $onPage, theme }) => ($onPage ? theme.colors.white : theme.colors.black)};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue};

    li {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
const MainContainer = styled.div`
  padding: 20px;
  width: 80%;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FilterBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
  position: absolute;
  top: 0;
  right: 0;
`;

const CardSection = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;
