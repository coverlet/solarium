import NodeCache from 'node-cache';

export const cache = new NodeCache({ stdTTL: 120, checkperiod: 140 });
