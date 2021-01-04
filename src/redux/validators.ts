import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { getValidators } from '../client/api';
import { IRedux, IValidatorInfo, IValidators, IValidatorsList } from './types';

const initialState: IValidators = {
  fetchingCluster: '',
  isFetching: false,
  validators: [],
};

const validatorsSlice = createSlice({
  name: 'validators',
  initialState,
  reducers: {
    setValidators: (state, action) => ({
      ...state,
      fetchingCluster: '',
      isFetching: false,
      validators: action.payload,
    }),
    setFetching: (state, action) => ({
      ...state,
      fetchingCluster: action.payload.cluster,
      isFetching: action.payload.isFetching,
    }),
  },
});

export const { setValidators, setFetching } = validatorsSlice.actions;

export const selectValidators = (state: IRedux): IValidatorInfo[] => state.validators.validators;
export const selectValidatorsLoading = (state: IRedux): boolean => state.validators.isFetching;

export default validatorsSlice.reducer;

export const fetchValidators = () => (dispatch: Dispatch, getState: () => IRedux): void => {
  const state: IRedux = getState();

  // already fetching validators for this cluster
  if (state.validators.isFetching && state.validators.fetchingCluster === state.app.cluster) {
    return;
  }

  dispatch(setFetching({ cluster: state.app.cluster, isFetching: true }));

  getValidators(state.app.cluster).then((data) => {
    dispatch(setValidators(data));
  });
};
