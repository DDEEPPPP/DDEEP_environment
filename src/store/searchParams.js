import { createSlice } from '@reduxjs/toolkit';

export const searchParams = createSlice({
  name: 'searchParmas',
  initialState: {
    url: '',
    params: {
      keyword: '',
      cat1: '',
    },
    reducers: {
      setUrl: (state, action) => {
        state.url = action.payload;
      },
      setKeyword: (state, action) => {
        state.params.keyword = action.payload;
      },
      setCat1: (state, action) => {
        state.params.cat1 = action.payload;
      },
    },
  },
});

export const { setUrl, setKeyword, setCat1 } = setSearchParams.action;
export default setSearchParams.reducer;
