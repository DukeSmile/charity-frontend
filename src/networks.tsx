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
  Bsc = 56,
  BscTestnet = 97
}

export const FromNetwork = NetworkIds.BscTestnet;

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
  [NetworkIds.Rinkeby]: {
    name: 'Ethereum Rinkeby',
    isEnabled: true,
    addresses: {
      DDAContract: '',
      OKAPI: ''
    },
    logo: EthereumIcon
  },
  [NetworkIds.BscTestnet]: {
    name: 'BSC Testnet',
    isEnabled: true,
    addresses: {
      DDAContract:'0xC29218B784E7960FA35A74C92639F8dB95bFe1B7', // 0x47A0f03FfABAAdF93fdF89F8fa3C8f0039C75fbb
    },
    logo: BscIcon
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
          [NetworkIds.Ethereum]: ''
      }
  },
  {
    img: tokenLogo.ETH,
    name:'ETH',
    abi: tethABI,
    address: {
        [NetworkIds.BscTestnet]: '0xC3685C54E792B17241F81e967DD3F95F7baF4115',
        [NetworkIds.Ethereum]: ''
    }
}
];