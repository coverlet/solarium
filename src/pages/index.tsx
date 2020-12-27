import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount, setCount } from '../redux/app';
import styles from './index.module.scss';

const HomePage = (): ReactElement => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div>
      Hello from Solarium.
      <button
        onClick={() => {
          dispatch(setCount(count + 1));
        }}
      >
        {count}
      </button>
    </div>
  );
};

export default HomePage;
