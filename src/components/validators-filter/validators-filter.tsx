import { ReactElement, useEffect } from 'react';
import useDimensions from 'react-use-dimensions';

import './validators-filter.module.scss';

export interface IValidatorFilterProps {
  setWidth: any;
}

export const ValidatorsFilter = ({ setWidth }: IValidatorFilterProps): ReactElement => {
  const [ref, { width }] = useDimensions();

  useEffect(() => {
    setWidth(width);
  }, [setWidth, width]);

  return (
    <div className="validator-container validator-filter">
      <div className="avatar-container"></div>
      <div className="name-container"></div>
      <div className="score"></div>
      <div className="stake" ref={ref}></div>
      <div className="slots"></div>
      <div className="version"></div>
    </div>
  );
};
