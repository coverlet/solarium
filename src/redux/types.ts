import { VoteAccountInfo } from '@solana/web3.js';

export interface IRedux {
  app: IApp;
  validators: IValidators;
}

export interface IApp {
  cluster: string;
  count: number;
}

export interface IValidatorInfo {
  network: string;
  account: string;
  name: string;
  keybase_id: string;
  www_url: string;
  details: string;
  created_at: string;
  updated_at: string;
  total_score: number;
  root_distance_score: number;
  vote_distance_score: number;
  skipped_slot_score: number;
  software_version: string;
  software_version_score: number;
  stake_concentration_score: number;
  data_center_concentration_score: number;
  published_information_score: number;
  security_report_score: number;
  active_stake: string;
  commission: number;
  delinquent: string;
  vote_account: string;
  skipped_slots: number;
  skipped_slot_percent: string;
  ping_time: number;
  url: string;
}

export interface IValidators {
  fetchingCluster: string;
  isFetching: boolean;
  validators: IValidatorInfo[];
}

// TODO normalize validators to this type
export interface IValidatorsList {
  [key: string]: IValidatorInfo;
}
