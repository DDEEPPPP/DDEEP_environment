import { configureStore } from '@reduxjs/toolkit';

import searchParams from './searchParams';

export default configureStore({
  reducer: {
    searchParams: searchParams.reducer,
  },
});
