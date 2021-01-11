import { cleanup } from '@testing-library/react';
import { HttpClient } from '../http-client';
import fetch from 'node-fetch';
jest.mock('node-fetch', () => jest.fn());

afterEach(cleanup);

describe('http client', () => {
  it('makes all requests correctly', async () => {
    const response = Promise.resolve({
      json: () => Promise.resolve({ hel: 'low', result: { jrpc: 'response' } }),
    });
    fetch.mockImplementation(() => response);

    const client = new HttpClient('http://127.0.0.1/');
    let res = await client.get('greeting');
    expect(res).toStrictEqual({ hel: 'low', result: { jrpc: 'response' } });

    res = await client.jsonRpc('getFunc');
    expect(res).toStrictEqual({ jrpc: 'response' });

    res = await client.jsonRpc('getFunc', null);
    expect(res).toStrictEqual({ jrpc: 'response' });
  });
});
