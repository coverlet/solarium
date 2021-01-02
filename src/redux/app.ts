import { createSlice } from '@reduxjs/toolkit';
import { defaultCluster } from '../config/clusters';
import { IApp, IRedux } from './types';

const initialState: IApp = {
  cluster: defaultCluster,
  count: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCluster: (state, action) => ({
      ...state,
      cluster: action.payload,
    }),
    setCount: (state, action) => ({
      ...state,
      count: action.payload,
    }),
  },
});

export const { setCount, setCluster } = appSlice.actions;

export const selectCount = (state: IRedux): number => state.app.count;
export const selectCluster = (state: IRedux): string => state.app.cluster;

export default appSlice.reducer;
