import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import BN from 'bn.js';

const BN_LAMP_PER_SOL = new BN(LAMPORTS_PER_SOL, 10);

export const lamportsToSol = (valueInLamports: string | number, decimals = 2): number => {
  let val;
  try {
    val = new BN(valueInLamports, 10);
  } catch (e) {
    console.log(typeof valueInLamports);
    console.log(valueInLamports);
    console.log(e);
    val = new BN(0, 10);
  }
  const decimalsDivider = new BN(Math.pow(10, decimals), 10);

  return val.divRound(BN_LAMP_PER_SOL.div(decimalsDivider)).toNumber() / decimalsDivider;
};

export const solToLamports = (valueInSol: string | number): BN => {
  const val = new BN(valueInSol, 10);
  return val.mul(BN_LAMP_PER_SOL);
};
