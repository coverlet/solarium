import { NextApiRequest, NextApiResponse } from 'next';
import { validatorsAppClient } from '../../client/validators-app';
import { IValidatorInfo } from '../../redux/types';
import { cache } from '../../utils/cache';
import {
  readValidatorsFromDisk,
  writeValidatorsToDisk,
} from './api-utils/developemet-validators-disk';
import { getSpriteMap } from './api-utils/sprite-map';

export default (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | Record<string, unknown>> => {
  const cluster = req.query.cluster as string;

  return new Promise((resolve) => {
    const cacheKey = `validators-${cluster}`;
    let validatorSet: IValidatorInfo[] = [];
    validatorSet = cache.get(cacheKey) as IValidatorInfo[];

    if (validatorSet == undefined || validatorSet === []) {
      // temporarly improve development reload times
      if (process.env.NODE_ENV === 'development') {
        validatorSet = readValidatorsFromDisk(cluster);
      }

      if (!validatorSet || (Array.isArray(validatorSet) && validatorSet.length === 0)) {
        console.log('fetching validators validators.app');

        validatorsAppClient.get(`validators/${cluster}.json`).then((data) => {
          validatorSet = data.reduce((acc: IValidatorInfo[], val: IValidatorInfo) => {
            !acc.some((v: IValidatorInfo) => {
              return val.account === v.account;
            }) && acc.push(val);
            return acc;
          }, []);

          // attach sprite info to validator
          getSpriteMap()
            .then((spriteData) => {
              validatorSet.forEach((validator) => {
                if (validator.keybase_id && spriteData.map[validator.keybase_id]) {
                  validator.pic = {
                    file: spriteData.filename,
                    x: spriteData.map[validator.keybase_id].x,
                    y: spriteData.map[validator.keybase_id].y,
                  };
                }
              });
            })
            .finally(() => {
              if (process.env.NODE_ENV === 'development') {
                writeValidatorsToDisk(cluster, validatorSet);
              }

              cache.set(cacheKey, validatorSet);
              resolve(validatorSet);
            });
        });
      } else {
        cache.set(cacheKey, validatorSet);
        resolve(validatorSet);
      }
    } else {
      console.log('got validators from cache');
      resolve(validatorSet);
    }
  }).then((data: IValidatorInfo[]) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  });
};
