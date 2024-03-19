import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  params: {},
};

const setCategory1Reducer = (state, action) => {
  state.params.cat1 = action.payload;
  if (!action.payload) {
    delete state.params.cat1;
    delete state.params.cat2;
    delete state.params.cat3;
  }
};

const setCategory2Reducer = (state, action) => {
  state.params.cat2 = action.payload;
  if (!action.payload) {
    delete state.params.cat2;
    delete state.params.cat3;
  }
};

const setCategory3Reducer = (state, action) => {
  state.params.cat3 = action.payload;
  if (!action.payload) {
    delete state.params.cat3;
  }
};

const listFilterParams = createSlice({
  name: 'filterParams',
  initialState,
  reducers: {
    setCategory1: setCategory1Reducer,
    setCategory2: setCategory2Reducer,
    setCategory3: setCategory3Reducer,
  },
});

export const {
  setCategory1: setCategory1Action,
  setCategory2: setCategory2Action,
  setCategory3: setCategory3Action,
} = listFilterParams.actions;

export default listFilterParams;
