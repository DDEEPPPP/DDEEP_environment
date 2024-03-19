import { configureStore } from '@reduxjs/toolkit';
import listFilterParams from './listFilterParams';

import searchParams from './searchParams';

export default configureStore({
  reducer: {
    searchParams: searchParams.reducer,
    listFilterParams: listFilterParams.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
