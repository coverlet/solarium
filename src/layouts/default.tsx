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
      </Head>
      <Container className={styles['main-container']}>
        <SolHeader />
        <Content>{children}</Content>
        <SolFooter />
      </Container>
    </>
  );
};
