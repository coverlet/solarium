import { clusters } from '../config/clusters';
import { HttpClient } from '../utils/http-client';

const clients = [];

export const getHttpClient = (clientId: string): HttpClient => {
  if (!clients[clientId]) {
    clients[clientId] = new HttpClient(clusters[clientId].url);
  }

  return clients[clientId];
};
