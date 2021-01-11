/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement } from 'react';
import { Icon } from 'rsuite';
import { EValidatorsSort, IValidatorsSorter } from '../../redux/types';

import './validators-sort-label.scss';

export interface IProps {
  sort: IValidatorsSorter;
  label: string;
  onClick: () => void;
  sorter: EValidatorsSort;
}

export const ValidatorsSortLabel = ({ sort, label, onClick, sorter }: IProps): ReactElement => {
  return (
    <a
      className="validators-sort-label"
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {label}
      {sort.by === sorter && (
        <Icon icon={sort.direction === 'asc' ? 'long-arrow-up' : 'long-arrow-down'} />
      )}
    </a>
  );
};
