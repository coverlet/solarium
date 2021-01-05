import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Dropdown } from 'rsuite';
import { clusters } from '../../config/clusters';
import { selectCluster, setCluster } from '../../redux/app';

import './sol-header.module.scss';

export const SolHeader = (): ReactElement => {
  const cluster = useSelector(selectCluster);
  const dispatch = useDispatch();
  return (
    <div className="sol-header">
      <div className="logo">Solarium</div>
      <div className="nav">
        <Nav>
          <Nav.Item>Home</Nav.Item>
          <Nav.Item>Assets</Nav.Item>
          <Nav.Item>About</Nav.Item>
        </Nav>
      </div>
      <div className="right-panel">
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
