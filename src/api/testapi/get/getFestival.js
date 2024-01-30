import { mockFestival } from '../mockData/festival';

const getFestival = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFestival);
    }, 1000);
  });
};

export { getFestival };
