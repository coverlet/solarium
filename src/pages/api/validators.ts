import { VoteAccountInfo } from '@solana/web3.js';
import { NextApiRequest, NextApiResponse } from 'next';
import { getHttpClient } from '../../client/solrpc';
import { getClient } from '../../client/web3sol';
import { CONFIG_PROGRAM_ADDRESS } from '../../config/constants';

interface IValidatorInfo extends VoteAccountInfo {
  deliquent: boolean;
  epochCredits: [any];
  activatedStake: number;
  info: any;
}

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
      (nodes.delinquent as IValidatorInfo[]).forEach((node) => {
        node.deliquent = true;
        delete node.epochCredits;
        node.activatedStake = Math.round(node.activatedStake * 0.000000001);
      });

      const allNodes = (nodes.current as IValidatorInfo[]).concat(
        nodes.delinquent as IValidatorInfo[]
      );
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

export default (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | Record<string, unknown>> => {
  console.log(req.query.cluster);

  // TODO proper error management
  return Promise.all([getValidators(req.query.cluster), getValidatorInfo(req.query.cluster)]).then(
    (data) => {
      data[0].forEach((validator, i) => {
        if (data[1][validator.nodePubkey]) {
          data[0][i].info = data[1][validator.nodePubkey];
        }
      });

      res.statusCode = 200;
      res.json(data[0]);
    }
  );
};
