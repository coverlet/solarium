import { IValidatorInfo } from '../../../redux/types';
import fs from 'fs';

export const readValidatorsFromDisk = (cluster: string): IValidatorInfo[] => {
  const tempPath = `./temp/cache_${cluster}.json`;
  let validators = [];

  try {
    if (fs.existsSync(tempPath)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validators = JSON.parse(fs.readFileSync(tempPath));
      console.log('got validators from disk file');
    }
  } catch (err) {
    console.error(err);
  }

  return validators;
};

export const writeValidatorsToDisk = (cluster: string, validators: IValidatorInfo[]): void => {
  const tempPath = `./temp/cache_${cluster}.json`;

  fs.writeFileSync(tempPath, JSON.stringify(validators));
};
