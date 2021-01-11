import React, { ReactElement } from 'react';
import styles from './sol-footer.module.scss';

export const SolFooter = (): ReactElement => {
  return <div className={styles['footer']}>&copy; 2021</div>;
};
