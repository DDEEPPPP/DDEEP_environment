import axios from 'axios';

const tourAPIInstance = axios.create({
  baseURL: 'https://apis.data.go.kr/B551011/KorService1',
  params: {
    serviceKey: 'Kwl/3od2qZkAp+XQdSiNgZIfbwLK5khnbyTh9AEENMTvkLDpmxwfVFcfAuKlW4fQcp+te/aBGGnzUcLOgbVaLg==',
    _type: 'json',
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    areaCode: '39',
    numOfRows: '20',
  },
});

export default tourAPIInstance;
