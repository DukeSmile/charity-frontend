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

export const FromNetwork = NetworkIds.Goerli;

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
      DDAContract: '0x5220fb6cA171B3b35E743153061ff971Fa2F2FdE'
    },
    logo: EthereumIcon
  },
  [NetworkIds.Ethereum]: {
    name: 'Ethereum',
    isEnabled: true,
    addresses: {
      DDAContract: '',
      OKAPI: ''
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
      [NetworkIds.Goerli]: '0xFB9D86a6469B0bb5C79136b3700b743738b1F0eB'
    }
  },
  {
    img: tokenLogo.BNB,
    name:'BNB',
    abi: tethABI,
    address: {
      [NetworkIds.BscTestnet]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      [NetworkIds.Goerli]: ''
    }
  },
  {
    img: tokenLogo.ETH,
    name:'ETH',
    abi: tethABI,
    address: {
      [NetworkIds.BscTestnet]: '',
      [NetworkIds.Goerli]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
    }
  }
];