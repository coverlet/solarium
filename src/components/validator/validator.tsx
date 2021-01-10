/* eslint-disable indent */
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import './validator.module.scss';
import { IValidatorInfo } from '../../redux/types';
import { SPRITE_BASE_URL } from '../../config/constants';
import { formatAddress } from '../../utils/format-address';
import React from 'react';
import { Icon } from 'rsuite';
import { clamp } from '../../utils/clamp';
import { scale } from '../../utils/scale';
import { formatNumber } from '../../utils/format-number';
import useVisibilitySensor from '@rooks/use-visibility-sensor';

export interface IValidatorProps {
  validator: IValidatorInfo;
  maxStake: number;
  stakeWidth?: number;
}

export const ValidatorComponent = ({
  validator,
  maxStake,
  stakeWidth,
}: IValidatorProps): ReactElement => {
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

  // const [show, setShow] = useState(false);

  // const rootNode = useRef(null);
  // const { isVisible } = useVisibilitySensor(rootNode, {
  //   intervalCheck: false,
  //   scrollCheck: true,
  //   resizeCheck: true,
  // });

  // useEffect(() => {
  //   isVisible && setShow(true);
  // }, [isVisible]);

  // ref={rootNode}
  return (
    <div className={`validator-container  ${validator.delinquent && 'deliquent'}`}>
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
        <div className={`name ${!validator.name ? 'custom' : null}`}>
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
      <div className="stake">
        <div
          className="stake-graph"
          style={{
            width: `${maxStake ? (validator.active_stake_sol * 100) / maxStake : 0}%`,
            backgroundSize: `${stakeWidth}px`,
          }}
        >
          ◎{formatNumber(validator.active_stake_sol)}
        </div>
      </div>
      <div className="slots">{validator.skipped_slots}</div>
      <div className="version">
        <div className="version-tag">{validator.software_version}</div>
      </div>
    </div>
  );
};

export const Validator = React.memo(ValidatorComponent);
