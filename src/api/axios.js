import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.visitjeju.net/vsjApi/contents/searchlist',
  params: {
    apikey: '70axhgpopy3z4k5f',
    local: 'kr',
  },
});

export default instance;
