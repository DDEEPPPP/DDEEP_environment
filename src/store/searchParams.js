import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  params: {
    keyword: '',
    cat1: '',
  },
};

// setKeyword reducer
const setKeywordReducer = (state, action) => {
  state.params.keyword = action.payload;
};

// setCat1 reducer
const setCat1Reducer = (state, action) => {
  state.params.cat1 = action.payload;
};

const searchParams = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setKeyword: setKeywordReducer,
    setCat1: setCat1Reducer,

  },
});

export const { setKeyword, setCat1 } = searchParams.actions;
export default searchParams;

