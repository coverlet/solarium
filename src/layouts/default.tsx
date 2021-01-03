import React, { ReactElement } from 'react';
import { Container, Content } from 'rsuite';
import { SolHeader } from '../components/sol-header/sol-header';
import { SolFooter } from '../components/sol-footer/sol-footer';
import Head from 'next/head';

import styles from './default.module.scss';

interface IDefaultLayoutProps {
  children: ReactElement;
  title?: string;
}

export const DefaultLayout = ({
  children,
  title = 'Solarium',
}: IDefaultLayoutProps): ReactElement => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container className={styles['main-container']}>
        <SolHeader />
        <Content>{children}</Content>
        <SolFooter />
      </Container>
    </>
  );
};
