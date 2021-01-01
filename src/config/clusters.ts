export const clusters: { [key: string]: ICluster } = {
  mainnet: {
    displayName: 'Mainnet beta',
    url: 'http://116.202.33.67:8899',
    explorerQuery: '',
  },
  testnet: {
    displayName: 'Testnet',
    url: 'http://168.119.49.27:8899',
    explorerQuery: '?cluster=testnet',
  },
  devnet: {
    displayName: 'Devnet',
    url: 'https://devnet.solana.com',
    explorerQuery: '?cluster=devnet',
  },
};

interface ICluster {
  displayName: string;
  url: string;
  explorerQuery: string;
}
