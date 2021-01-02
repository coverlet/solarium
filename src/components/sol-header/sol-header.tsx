import { ReactElement } from 'react';

import styles from './sol-header.module.scss';

export const SolHeader = (): ReactElement => {
  return <div className={styles['header']}>Solarium</div>;
};
