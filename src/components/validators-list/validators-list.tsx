import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCluster } from '../../redux/app';
import { fetchValidators, selectValidators, selectValidatorsLoading } from '../../redux/validators';
import { Placeholder } from 'rsuite';

import './validators-list.module.scss';
import { Validator } from '../validator/validator';

let interval;
const startingParagraphs = 12;
const maxParagraphs = 20;

export const ValidatorsList = (): ReactElement => {
  const dispatch = useDispatch();
  const cluster = useSelector(selectCluster);
  const validators = useSelector(selectValidators);
  const validatorsLoading = useSelector(selectValidatorsLoading);
  const [paragraphs, setParagraphs] = useState(startingParagraphs);

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

  return (
    <div className="validatos-list">
      Validators
      {validatorsLoading && (
        <>
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
      {!validatorsLoading && (
        <div>
          {validators.map((validator) => (
            <Validator key={validator.account} validator={validator} />
          ))}
        </div>
      )}
    </div>
  );
};
