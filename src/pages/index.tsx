import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount, setCount } from '../redux/app';
import { Button } from 'rsuite';
import { ValidatorsList } from '../components/validators-list/validators-list';

import styles from './index.module.scss';

const HomePage = (): ReactElement => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      Hello from
      <Button
        onClick={() => {
          dispatch(setCount(count + 1));
        }}
        // appearance="primary"
      >
        Solarium {count}
      </Button>
      <ValidatorsList />
    </div>
  );
};

export default HomePage;
