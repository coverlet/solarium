/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement, useEffect } from 'react';
import useDimensions from 'react-use-dimensions';
import { EValidatorsSort } from '../../redux/types';

import './validators-filter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectSort, setSorter } from '../../redux/validators';
import { ValidatorsSortLabel } from '../validators-sort-label/validators-sort-label';

export interface IValidatorFilterProps {
  setWidth: any;
}

export const ValidatorsFilter = ({ setWidth }: IValidatorFilterProps): ReactElement => {
  const [ref, { width }] = useDimensions();
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);

  useEffect(() => {
    setWidth(width);
  }, [setWidth, width]);

  return (
    <div className="validator-filter">
      <div className="avatar-container"></div>
      <div className="name-container">
        <ValidatorsSortLabel
          onClick={() => {
            dispatch(setSorter(EValidatorsSort.fee));
          }}
          sort={sort}
          label="FEE"
          sorter={EValidatorsSort.fee}
        />
      </div>
      <div className="score">
        <ValidatorsSortLabel
          onClick={() => {
            dispatch(setSorter(EValidatorsSort.score));
          }}
          sort={sort}
          label="SCORE"
          sorter={EValidatorsSort.score}
        />
      </div>
      <div className="stake" ref={ref}>
        <ValidatorsSortLabel
          onClick={() => {
            dispatch(setSorter(EValidatorsSort.stake));
          }}
          sort={sort}
          label="STAKE"
          sorter={EValidatorsSort.stake}
        />
      </div>
      <div className="slots">SKIPPED</div>
      <div className="version">VERSION</div>
    </div>
  );
};
