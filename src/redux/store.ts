import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app';
import validatorsReducer from './validators';

// TODO MAYBE REMOVE SS Redux
// wtf was that??

export default configureStore({
  reducer: {
    app: appReducer,
    validators: validatorsReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
