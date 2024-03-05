import { createSlice } from '@reduxjs/toolkit';

export const searchParams = createSlice({
  name: 'searchParams',
  initialState: {
    params: {
      keyword: '',
      cat1: '',
    },
    reducers: {
      setKeyword: (state, action) => {
        state.params.keyword = action.payload;
      },
      setCat1: (state, action) => {
        state.params.cat1 = action.payload;
      },
    },
  },
});

export const { setKeyword, setCat1 } = searchParams.actions;
export default searchParams;
