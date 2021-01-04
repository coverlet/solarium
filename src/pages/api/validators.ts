import { NextApiRequest, NextApiResponse } from 'next';
import { getHttpClient } from '../../client/solrpc';
import { getClient } from '../../client/web3sol';
import { CONFIG_PROGRAM_ADDRESS } from '../../config/constants';
import { cache } from '../../utils/cache';
import fs from 'fs';
import { IValidatorInfo } from '../../redux/types';

const stakeSort = (a: any, b: any) => {
  if (a.activatedStake === b.activatedStake) {
    return 0;
  }
  if (a.activatedStake > b.activatedStake) {
    return -1;
  } else {
    return 1;
  }
};

const getValidators = (cluster): Promise<IValidatorInfo[]> => {
  return getClient(cluster)
    .getVoteAccounts()
    .then((nodes) => {
      (nodes.current as IValidatorInfo[]).forEach((node) => {
        node.deliquent = false;
        delete node.epochCredits;
        node.activatedStake = Math.round(node.activatedStake * 0.000000001);
      });

      // XXX check deliquency here
      (nodes.delinquent as IValidatorInfo[]).forEach((node) => {
        node.deliquent = true;
        delete node.epochCredits;
        node.activatedStake = Math.round(node.activatedStake * 0.000000001);
      });

      const allNodes = nodes.current as IValidatorInfo[];
      // .concat(
      //   nodes.delinquent as IValidatorInfo[]
      // );
      allNodes.sort(stakeSort);
      return allNodes;
    });
};

const getValidatorInfo = (cluster) => {
  return getHttpClient(cluster)
    .jsonRpc('getProgramAccounts', [
      CONFIG_PROGRAM_ADDRESS,
      {
        encoding: 'jsonParsed',
      },
    ])
    .then((data) => {
      // TODO ofc, check for errors
      return data.reduce((nodes, current) => {
        if (!current.account.data.parsed) {
          return nodes;
        }
        const info = current.account.data.parsed.info;

        if (current.account.data.parsed.type === 'validatorInfo') {
          const key = info.keys.find((k) => k.signer === true);
          nodes[key.pubkey] = info.configData;
        }
        return nodes;
      }, {});
    });
};

const getValidatorsSet = (cluster: string): Promise<IValidatorInfo[]> => {
  return new Promise((resolve) => {
    const cacheKey = `validators-${cluster}`;
    const validators = cache.get(cacheKey) as IValidatorInfo[];
    const tempPath = `./temp/cache_${cluster}.json`;
    if (validators == undefined) {
      let validatorSet = [];

      // temporarly improve development reload times
      if (process.env.NODE_ENV === 'development') {
        try {
          if (fs.existsSync(tempPath)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            validatorSet = JSON.parse(fs.readFileSync(tempPath));
            console.log('got from cache file');
          }
        } catch (err) {
          console.error(err);
        }
      }

      if (Array.isArray(validatorSet) && validatorSet.length === 0) {
        console.log('fetching validators from blockchain');
        Promise.all([getValidators(cluster), getValidatorInfo(cluster)]).then((data) => {
          data[0].forEach((validator, i) => {
            if (data[1][validator.nodePubkey]) {
              data[0][i].info = data[1][validator.nodePubkey];
            }
          });

          validatorSet = data[0];
          cache.set(cacheKey, validatorSet);

          if (process.env.NODE_ENV === 'development') {
            fs.writeFileSync(tempPath, JSON.stringify(validatorSet));
          }
          resolve(validatorSet);
        });
      } else {
        cache.set(cacheKey, validatorSet);
        resolve(validatorSet);
      }
    } else {
      console.log('got from cache');
      resolve(validators);
    }
  });
};

export default (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | Record<string, unknown>> => {
  console.log(req.query.cluster);

  return getValidatorsSet(req.query.cluster as string).then((data) => {
    // TODO proper error management
    res.statusCode = 200;
    res.json(data);
  });
};
