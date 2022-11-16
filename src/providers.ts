import { Provider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { NetworkIds } from "./networks";

interface ChainDetailsOpts {
  networkName: string,
  rpcUrls: string[],
  symbol: string,
  decimals: number,
  blockExplorerUrls: string[],
  multicallAddress?: string,
}

class ChainDetails {
  readonly networkName: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly rpcUrls: string[];
  readonly blockExplorerUrls: string[];
  readonly multicallAddress?: string;
  readonly provider: Promise<Provider>;

  constructor(chainDetailsOpts: ChainDetailsOpts) {
    this.networkName = chainDetailsOpts.networkName;
    this.rpcUrls = chainDetailsOpts.rpcUrls;
    this.symbol = chainDetailsOpts.symbol;
    this.decimals = chainDetailsOpts.decimals;
    this.blockExplorerUrls = chainDetailsOpts.blockExplorerUrls;
    this.multicallAddress = chainDetailsOpts.multicallAddress;

    // Use the fastest node available
    this.provider = ChainDetails.getFastestRpcUrl(this.rpcUrls).then(rpcUrl => {
      const staticProvider = new StaticJsonRpcProvider(rpcUrl);
    //   if (this.multicallAddress) {
    //     return new MulticallProvider(this.networkName, staticProvider, this.multicallAddress);
    //   } else {
        return staticProvider;
    //   }
    });
  }

  // Return the fastest rpcUrl available
  private static async getFastestRpcUrl(rpcUrls: string[]): Promise<string> {
    return Promise.any(rpcUrls.map(rpcUrl => new Promise<string>((resolve, reject) => {
    //   NodeHelper.checkNodeStatus(rpcUrl).then(working => {
    //     if (working) {
    //       resolve(rpcUrl);
    //     } else {
    //       reject();
    //     }
    //   });
    })));
  }

}

interface AllChainDetails {
  [key: number]: ChainDetails
}

export const chains: AllChainDetails = {
  [NetworkIds.Ethereum]: new ChainDetails({
    networkName: 'Ethereum',
    rpcUrls: [
      'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
    ],
    symbol: 'ETH',
    decimals: 18,
    blockExplorerUrls: ['https://etherscan.io/'],
  }),
  [NetworkIds.Goerli]: new ChainDetails({
    networkName: 'Goerli',
    rpcUrls: [
      'https://eth-goerli.g.alchemy.com/v2/9LMwna_qFe9VoTN0xx8424BaIcr8vLnR',
      'https://eth-goerli.public.blastapi.io'
    ],
    symbol: 'ETH',
    decimals: 18,
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  }),
  [NetworkIds.Bsc]: new ChainDetails({
    networkName: 'Bsc',
    rpcUrls: [
      'https://bsc-dataseed3.defibit.io',
    ],
    symbol: 'BNB',
    decimals: 18,
    blockExplorerUrls: [],
  }),
  [NetworkIds.BscTestnet]: new ChainDetails({
    networkName: 'BscTestnet',
    rpcUrls: [
      'https://data-seed-prebsc-1-s1.binance.org:8545',
    ],
    symbol: 'BNB',
    decimals: 18,
    blockExplorerUrls: ['https://bscscan.com'],
  }),
};
