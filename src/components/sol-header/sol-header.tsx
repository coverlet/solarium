import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Dropdown } from 'rsuite';
import { clusters } from '../../config/clusters';
import { selectCluster, setCluster } from '../../redux/app';

import styles from './sol-header.module.scss';
console.log(clusters);
export const SolHeader = (): ReactElement => {
  const cluster = useSelector(selectCluster);
  const dispatch = useDispatch();
  console.log('-----------');
  console.log(cluster);
  return (
    <div className={styles['header']}>
      <div className={styles['logo']}>Solarium</div>
      <div className={styles['nav']}>
        <Nav>
          <Nav.Item>Home</Nav.Item>
          <Nav.Item>Assets</Nav.Item>
          <Nav.Item>About</Nav.Item>
        </Nav>
      </div>
      <div className={styles['right-panel']}>
        <Dropdown
          appearance="default"
          title={clusters[cluster].displayName}
          placement="bottomEnd"
          size="md"
        >
          {Object.keys(clusters).map((key) => (
            <Dropdown.Item
              key={key}
              active={key === cluster}
              onSelect={() => {
                dispatch(setCluster(key));
              }}
            >
              {clusters[key].displayName}
              <div className="small muted">{clusters[key].url}</div>
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
    </div>
  );
};
