/* eslint-disable indent */
import { ReactElement } from 'react';
import './validator.module.scss';
import { IValidatorInfo } from '../../redux/types';
import { SPRITE_BASE_URL } from '../../config/constants';
import { formatAddress } from '../../utils/format-address';

export interface IValidatorProps {
  validator: IValidatorInfo;
}
const randomColorsPallets = [
  '#3f3b61',
  '#502c5f',
  '#712a2e',
  '#384d4e',
  '#365637',
  '#585f45',
  '#69392f',
];

const getRandomColor = (): string => {
  return randomColorsPallets[Math.floor(Math.random() * randomColorsPallets.length)];
};

export const Validator = ({ validator }: IValidatorProps): ReactElement => {
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
                  backgroundColor: getRandomColor(),
                }
          }
        >
          {!validator?.pic && (validator.name || validator.account)[0]}
        </div>
      </div>
      <div className="name">{validator.name || formatAddress(validator.account)}</div>
      <div className="score">{validator.total_score}</div>
      <div className="stake">{validator.active_stake}</div>
      <div className="slots">{validator.skipped_slots}</div>
      <div className="version">{validator.software_version}</div>
    </div>
  );
};
