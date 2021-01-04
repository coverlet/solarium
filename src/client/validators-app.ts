import { VALIDATORS_APP_URL } from '../config/constants';
import { HttpClient } from '../utils/http-client';

export const validatorsAppClient = new HttpClient(VALIDATORS_APP_URL, {
  headers: {
    Token: process.env.VALIDATORS_APP_TOKEN,
  },
});
