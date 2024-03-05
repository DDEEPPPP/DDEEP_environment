import axios from '../../api/axios';
import React, { useCallback, useEffect, useState } from 'react';
import SearchTab from '../../components/SearchTab';

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
  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);
  console.log(data);
  return (
    <div>
      <SearchTab />
      <SearchTab />
      <SearchTab />
      <SearchTab />
    </div>
  );
};

export default SearchPage;
