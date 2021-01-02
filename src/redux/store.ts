import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app';

// TODO MAYBE REMOVE SS Redux
// TODO check this out

export default configureStore({
  reducer: {
    app: appReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
