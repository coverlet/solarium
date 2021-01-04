import { VoteAccountInfo } from '@solana/web3.js';

export interface IRedux {
  app: IApp;
  validators: IValidators;
}

export interface IApp {
  cluster: string;
  count: number;
}

export interface IValidators {
  fetchingCluster: string;
  isFetching: boolean;
  validators: IValidatorInfo[];
}

export interface IValidatorInfo extends VoteAccountInfo {
  deliquent: boolean;
  epochCredits: [any];
  activatedStake: number;
  info: any;
}

// TODO normalize validators to this type
export interface IValidatorsList {
  [key: string]: IValidatorInfo;
}
