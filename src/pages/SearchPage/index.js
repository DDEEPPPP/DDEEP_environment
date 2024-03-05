import axios from '../../api/axios';
import React, { useCallback, useEffect, useState } from 'react';
import SearchTab from '../../components/SearchTab';

import request from '../../api/request';
import { useSelector } from 'react-redux';


const SearchPage = () => {
  const [data, setData] = useState([]);
  //임시 검색 데이터 불러오기
  const fetchData = useCallback(async () => {
    try {
      let response;
      let params = {
        areaCode: '39',
        numOfRows: '9999',
        cat1: 'A04',
      };
      response = await axios.get('/areaBasedList1', { params });
      const dataArr = response?.data?.response?.body?.items?.item || [];
      setData(dataArr);
    } catch (error) {
      console.log(error);
    }
  }, []);
  // const searchParams = useSelector((state) => state.searchParams);
  // console.log('store: ' + searchParams);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);
  console.log(data);
  return (
    <div>
      <SearchTab title="관광명소" id="RM" url={request.fetchAreaBased} />
      <SearchTab title="문화시설" id="CC" url={request.fetchAreaBased} />
      <SearchTab title="팝업스토어" id="PS" url={request.fetchFestivals} />
      <SearchTab title="플리마켓" id="FM" url={request.fetchAreaBased} />
      <SearchTab title="페스티벌" id="FV" url={request.fetchFestivals} />

    </div>
  );
};

export default SearchPage;
