import ddaContractABI from './abi/ddaContractABI.json';
import tusdtABI from './abi/tusdtABI.json';
import tethABI from './abi/tethABI.json';
import okapiTokenABI from './abi/okapiTokenABI.json';

import EthereumIcon from "./assets/images/networks/ethereum.svg";
import BscIcon from "./assets/images/networks/bsc.svg";
import { tokenProp } from './core/interfaces/base';
import { tokenLogo } from './components/tokenLogo';

export type NetworkId = number;

export enum NetworkIds {
  Ethereum = 1,
  Rinkeby = 4,
  Goerli = 5,
  Bsc = 56,
  BscTestnet = 97,
}

export const FromNetwork = NetworkIds.Ethereum;

interface INetwork {
  name: string,
  isEnabled: boolean,
  addresses: { [key: string]: string },
  logo?: any
}

interface INetworks {
  [key: string]: INetwork;
}

export const networks: INetworks = {
  [NetworkIds.Goerli]: {
    name: 'Ethereum Goerli',
    isEnabled: true,
    addresses: {
      DDAContract: '0x13B044A7e7993544ce95122e9D44F44D2c2EafD5'
    },
    logo: EthereumIcon
  },
  [NetworkIds.Ethereum]: {
    name: 'Ethereum',
    isEnabled: true,
    addresses: {
      DDAContract: '0x8173A6aD04592BFF319e0825c3AE274897c5Bfbb',
      OKAPI: '0x29cd78954c023cd9bffc435a816e568edaf732af'
    },
    logo: EthereumIcon
  },
  [NetworkIds.Bsc]: {
    name: 'BSC',
    isEnabled: true,
    addresses: {
      DDAContract: '',
      OKAPI: ''
    },
    logo: BscIcon
  },
  [NetworkIds.BscTestnet]: {
    name: 'BSC Testnet',
    isEnabled: true,
    addresses: {
      DDAContract:'0xE5E1a756E164b619495A55C2699D64Fc538f32B9',
    },
    logo: BscIcon
  }
};

interface tokenABIS {
  [key: string]: any;
};
export const contractABIs: tokenABIS = {
  DDAContract: ddaContractABI,
  USDT: tusdtABI,
  OKAPI: okapiTokenABI,
  ETH: tethABI
}

export const enabledNetworkIds: NetworkId[] = Object.keys(networks).map(networkId => parseInt(networkId)).filter(networkId => networks[networkId].isEnabled);

export const tokenList: tokenProp[] = [
  {
    img: tokenLogo.USDT,
    name:'USDT',
    abi: tusdtABI,
    address: {
      [NetworkIds.BscTestnet]: '0xbF68079500Ea88c84f95cfB8840C9F569b945a74',
      [NetworkIds.Goerli]: '0x2926EFc3923094478a51f3C476fb7144D562d2c1',
      [NetworkIds.Ethereum]: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    }
  },
  {
    img: tokenLogo.BNB,
    name:'BNB',
    abi: tethABI,
    address: {
      [NetworkIds.BscTestnet]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      [NetworkIds.Goerli]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      [NetworkIds.Ethereum]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
    }
  },
  {
    img: tokenLogo.ETH,
    name:'ETH',
    abi: tethABI,
    address: {
      [NetworkIds.BscTestnet]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      [NetworkIds.Goerli]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      [NetworkIds.Ethereum]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
    }
  }
];