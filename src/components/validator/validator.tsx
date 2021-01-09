/* eslint-disable indent */
import { ReactElement, useMemo } from 'react';
import './validator.module.scss';
import { IValidatorInfo } from '../../redux/types';
import { SPRITE_BASE_URL } from '../../config/constants';
import { formatAddress } from '../../utils/format-address';
import React from 'react';
import { Icon } from 'rsuite';
import { clamp } from '../../utils/clamp';
import { scale } from '../../utils/scale';
import { lamportsToSol } from '../../utils/convert-sol';
import { formatNumber } from '../../utils/format-number';

export interface IValidatorProps {
  validator: IValidatorInfo;
}

console.log(scale(20, 0, 20, 160, 90));

export const ValidatorComponent = ({ validator }: IValidatorProps): ReactElement => {
  // TODO memoize this and stake
  const feeBgColor = useMemo(() => {
    const clampedFee = clamp(validator.commission, 0, 40);
    let bgColor = '#a73f4466';
    if (clampedFee < 5) {
      bgColor = '#55966966';
    } else if (clampedFee < 8) {
      bgColor = '#55619666';
    } else if (clampedFee < 20) {
      bgColor = '#80559666';
    } else if (clampedFee < 30) {
      bgColor = '#a04f7566';
    }
    return bgColor;
  }, [validator]);

  return (
    <div className="validator-container">
      <div className="avatar-container">
        <div
          className="avatar"
          style={
            validator?.pic
              ? {
                  backgroundImage: `url(${SPRITE_BASE_URL + validator?.pic?.file})`,
                  backgroundPosition: `-${validator?.pic?.x}px -${validator?.pic?.y}px`,
                }
              : {
                  backgroundImage: 'url(/server.png)',
                }
          }
        ></div>
      </div>
      <div className="name-container">
        <div className={`name ${!validator.name && 'custom'}`}>
          {validator.www_url ? (
            <a href={validator.www_url} rel="noreferrer" target="_blank">
              {validator.name || formatAddress(validator.account)}
              <Icon icon="external-link" />
            </a>
          ) : (
            validator.name || formatAddress(validator.account)
          )}
        </div>
        <div
          className="fee"
          style={{
            backgroundColor: feeBgColor,
          }}
        >
          {validator.commission} %
        </div>
      </div>
      <div className="score">
        <div className="card">{validator.total_score}</div>
      </div>
      <div className="stake">◎{formatNumber(lamportsToSol(validator.active_stake))}</div>
      <div className="slots">{validator.skipped_slots}</div>
      <div className="version">{validator.software_version}</div>
    </div>
  );
};

export const Validator = React.memo(ValidatorComponent);
