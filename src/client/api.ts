import { IValidatorInfo } from '../redux/types';
import { HttpClient } from '../utils/http-client';

const httpApiClient = new HttpClient('/api/');

export const getValidators = (cluster: string): Promise<IValidatorInfo[]> => {
  return httpApiClient.get(`validators?cluster=${cluster}`);
};
