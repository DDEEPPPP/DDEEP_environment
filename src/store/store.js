import { configureStore } from '@reduxjs/toolkit';
import setSearchParamsReducer from './searchParams';

export default configureStore({
  reducer: {
    searchParmas: setSearchParamsReducer,
  },
});
