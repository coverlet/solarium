import { Provider } from 'react-redux';
import React, { ReactElement } from 'react';
import store from '../redux/store';
import { AppProps } from 'next/app';
import '../style/custom-theme.less';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
