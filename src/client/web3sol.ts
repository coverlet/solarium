import * as web3 from '@solana/web3.js';
import { clusters } from '../config/clusters';

const clients = [];

export const getClient = (clientId: string): web3.Connection => {
  if (!clients[clientId]) {
    clients[clientId] = new web3.Connection(clusters[clientId].url);
  }

  return clients[clientId];
};
