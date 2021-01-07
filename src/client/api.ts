import { API_BASE_URL } from '../config/constants';
import { IValidatorInfo } from '../redux/types';
import { HttpClient } from '../utils/http-client';

const httpApiClient = new HttpClient(API_BASE_URL);

export const getValidators = (cluster: string): Promise<IValidatorInfo[]> => {
  return httpApiClient.get(`validators/${cluster}`);
};
