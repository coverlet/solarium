import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCluster } from '../../redux/app';
import { fetchValidators, selectValidatorsLoading } from '../../redux/validators';
import { Loader, Placeholder } from 'rsuite';
import { Validator } from '../validator/validator';
import { createSelector } from 'reselect';
import { IRedux, IValidatorInfo, EValidatorsSort, IValidatorsSorter } from '../../redux/types';

import './validators-list.module.scss';
import { ValidatorsFilter } from '../validators-filter/validators-filter';

const sortAttributes = {
  [EValidatorsSort.stake]: 'active_stake_sol',
  [EValidatorsSort.score]: 'total_score',
  [EValidatorsSort.fee]: 'commission',
};

const getValidatorsSorter = (
  sort: IValidatorsSorter
): ((a: IValidatorInfo, b: IValidatorInfo) => number) => {
  const direction = sort.direction === 'asc' ? 1 : -1;
  return (a, b) => {
    if (a[sortAttributes[sort.by]] === b[sortAttributes[sort.by]]) {
      return 0;
    }

    if (a[sortAttributes[sort.by]] > b[sortAttributes[sort.by]]) {
      return direction;
    } else {
      return direction * -1;
    }
  };
};

const selectSortedValidators = createSelector(
  (state: IRedux) => state.validators.validators,
  (state: IRedux) => state.validators.display.sort,
  (validators, sort) => {
    return validators.slice().sort(getValidatorsSorter(sort));
  }
);

let interval;
const startingParagraphs = 6;
const maxParagraphs = 20;

const ValidatorsListComponent = (): ReactElement => {
  const dispatch = useDispatch();
  const cluster = useSelector(selectCluster);
  const validators = useSelector(selectSortedValidators);
  const validatorsLoading = useSelector(selectValidatorsLoading);
  const [paragraphs, setParagraphs] = useState(startingParagraphs);
  const [maxStake, setMaxStale] = useState(0);
  const [width, setWidth] = useState(0);

  // TODO calculate window space and add placeholders to fit it

  useEffect(() => {
    let _maxStake = 0;
    validators.forEach((v) => {
      if (v.active_stake_sol > _maxStake) {
        _maxStake = v.active_stake_sol;
      }
    });

    setTimeout(() => {
      setMaxStale(_maxStake);
    }, 200);
  }, [validators]);

  useEffect(() => {
    if (validatorsLoading) {
      setMaxStale(0);
    }
  }, [validatorsLoading]);

  useEffect(() => {
    dispatch(fetchValidators());
  }, [cluster, dispatch]);

  useEffect(() => {
    if (validatorsLoading) {
      interval = setInterval(() => {
        setParagraphs((paragraphs) => {
          if (paragraphs >= maxParagraphs) {
            clearInterval(interval);
            return paragraphs;
          }
          return paragraphs + 1;
        });
      }, 50);
    } else {
      setParagraphs(startingParagraphs);
      interval && clearInterval(interval);
    }

    return () => {
      setParagraphs(startingParagraphs);
      clearTimeout(interval);
    };
  }, [validatorsLoading]);

  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  return (
    <div className="validatos-list box">
      {showChild && <ValidatorsFilter setWidth={setWidth} />}
      {validatorsLoading && (
        <>
          <Loader center content="loading" />
          {[...Array(paragraphs)].map((e, i) => (
            <Placeholder.Paragraph
              key={i}
              className="placeholder"
              rowMargin={19}
              graph="square"
              rows={1}
              active={true}
              rowHeight={24}
              style={{
                opacity: `${(paragraphs - i) / paragraphs}`,
              }}
            />
          ))}
        </>
      )}
      {!validatorsLoading &&
        validators.map((validator) => (
          <Validator
            key={validator.account}
            validator={validator}
            maxStake={maxStake}
            stakeWidth={width}
          />
        ))}
    </div>
  );
};

export const ValidatorsList = React.memo(ValidatorsListComponent);
