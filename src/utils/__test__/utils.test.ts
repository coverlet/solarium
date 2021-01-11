import { cleanup } from '@testing-library/react';
import { cache } from '../cache';
import { clamp } from '../clamp';
import { lamportsToSol, solToLamports } from '../convert-sol';
import { formatNumber } from '../format-number';
import { formatAddress } from '../format-address';
import { BN } from 'bn.js';
import { scale } from '../scale';

afterEach(cleanup);

describe('utils functions', () => {
  it('sets and retrives objects in cache', () => {
    cache.set('test', 1);
    expect(cache.get('test')).toBe(1);
  });

  it('clamps number correctly', () => {
    expect(clamp(10, 1, 5)).toBe(5);
    expect(clamp(-1, 1, 5)).toBe(1);
    expect(clamp(2, 5, 1)).toBe(2);
    expect(clamp(null, 5, null)).toBe(0);
  });

  it('converts sol', () => {
    expect(lamportsToSol('1112222222222222')).toBe(1112222.22);
    expect(solToLamports(122222).toNumber()).toBe(122222000000000);
    expect(lamportsToSol(1111111111111111111111111111111111111111)).toBe(0);
  });

  it('formats address', () => {
    expect(formatAddress('3mAdTFpfU9YG79cqBHPvmDcPWyLw2KNuCc88XwrZTjiM')).toBe('3mAd...TjiM');
  });

  it('formats number', () => {
    const navigatorBackup = global.navigator;

    expect(formatNumber(1000000)).toBe('1,000,000');

    Object.defineProperty(global.navigator, 'language', { value: '', configurable: true });
    Object.defineProperty(global.navigator, 'languages', { value: '', configurable: true });

    expect(
      formatNumber(50, {
        currency: 'USD',
      })
    ).toBe('$50');

    expect(
      formatNumber(0.12, {
        minDigits: 8,
      })
    ).toBe('0.12000000');

    expect(
      formatNumber(0.001, {
        minDigits: () => 4,
        maxDigits: 6,
      })
    ).toBe('0.0010');

    expect(
      formatNumber(new BN('1233'), {
        minDigits: () => 4,
        maxDigits: 6,
      })
    ).toBe('1,233.0000');

    expect(formatNumber(null)).toBe('0');

    global.navigator = navigatorBackup;
  });

  it('maps to range correctly', () => {
    expect(scale(2, 1, 10, 10, 100)).toBe(20);
    expect(scale(4, 1, 10, 40, 800, false)).toBe(293.33333333333337);
  });
});
