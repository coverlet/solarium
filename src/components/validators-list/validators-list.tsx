import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCluster } from '../../redux/app';
import { fetchValidators, selectValidators, selectValidatorsLoading } from '../../redux/validators';
import { Placeholder } from 'rsuite';

import './validators-list.module.scss';

export const ValidatorsList = (): ReactElement => {
  const dispatch = useDispatch();
  const cluster = useSelector(selectCluster);
  const validators = useSelector(selectValidators);
  const validatorsLoading = useSelector(selectValidatorsLoading);

  useEffect(() => {
    console.log(cluster);
    dispatch(fetchValidators());
  }, [cluster, dispatch]);

  return (
    <div className="validatos-list">
      Validators
      {validatorsLoading && (
        <>
          <Placeholder.Paragraph
            className="placeholder"
            rowMargin={14}
            graph="circle"
            active={true}
          />
          <Placeholder.Paragraph
            className="placeholder"
            rowMargin={14}
            graph="circle"
            active={true}
          />
          <Placeholder.Paragraph
            className="placeholder"
            rowMargin={14}
            graph="circle"
            active={true}
          />
        </>
      )}
      {!validatorsLoading && (
        <div>
          {validators.map((validator) => (
            <div key={`${cluster}_${validator.account}`}>{validator.account}</div>
          ))}
        </div>
      )}
    </div>
  );
};
