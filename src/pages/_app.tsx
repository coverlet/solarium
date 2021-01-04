import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { AppProps } from 'next/app';
import { DefaultLayout } from '../layouts/default';

// HACK replace this with proper globals file when fixed
import '../style/globals.scss';
import '../style/custom-theme.less';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const Layout = pageProps.Layout ? pageProps.Layout : DefaultLayout;

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
