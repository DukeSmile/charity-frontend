import ddaContractABI from './abi/ddaContractABI.json';
import tusdtABI from './abi/tusdtABI.json';
import tethABI from './abi/tethABI.json';
import okapiTokenABI from './abi/okapiTokenABI.json';

import EthereumIcon from "./assets/images/networks/ethereum.svg";
import BscIcon from "./assets/images/networks/bsc.svg";

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
      SPRING: '0xaa3648E6533028F422dc514b5EDe8Fb9171Bf8f2',
      SUMMER: '0x37eeB07454332dC47cEE7D91e9DcB51D19317806',
      AUTUMN: '0x18349631F5F39CdbcEd344a1EB8cE20A1C884EBB',
      WINTER: '0x40e076f7E6757e8bdb6BdF4d8512404A56039a64',
      ETH_BRIDGE: '0xEf3B7C80d2aAaC5Ed2689Bd0D35A5e69b93D4b9E'
    },
    logo: EthereumIcon
  },
  [NetworkIds.BscTestnet]: {
    name: 'BSC Testnet',
    isEnabled: true,
    addresses: {
      SPRING: '0xe9ec6407f99b54b29D43B74ed286503c9Effd60F',
      SUMMER: '0x02DF25f221C38987A628fc9F3F8059c0C5B204E0',
      AUTUMN: '0xfACb7C553468AFDAA2000B237688d3271E538725',
      WINTER: '0x4D44480F157DE93027E8c7dC26836aFeeEDDC946',
      BSC_BRIDGE: '0x68C41083cE39b48Eb06a824A28336Cdb21A795DD'
    },
    logo: BscIcon
  },
  [NetworkIds.Ethereum]: {
    name: 'Ethereum',
    isEnabled: true,
    addresses: {
      SPRING: '0xf04aF3f4E4929F7CD25A751E6149A3318373d4FE',
      SUMMER: '0x4D4f3715050571A447FfFa2Cd4Cf091C7014CA5c',
      AUTUMN: '0x4c3bAe16c79c30eEB1004Fb03C878d89695e3a99',
      WINTER: '0xCcbA0b2bc4BAbe4cbFb6bD2f1Edc2A9e86b7845f',
      ETH_BRIDGE: '0x9d593299cf32410045D114C3C18a68ACEECDD3f7'
    },
    logo: EthereumIcon
  },
  [NetworkIds.Bsc]: {
    name: 'BSC',
    isEnabled: true,
    addresses: {
      SPRING: '0x8d725B8848cf9C971Fa8991cbDeE2e1a35ac9DeC',
      SUMMER: '0x21B174B45f930C1b5E34b5066C95d4dBe23Ef421',
      AUTUMN: '0xec964DeE5172d86A0188B992B1F5603DE947f41b',
      WINTER: '0x8080821eec2B90Bc18dd7Fd9D5Fc7c3F820EB7e9',
      BSC_BRIDGE: '0xA2E1136d323896eD56F15ff85b9C73C6DdC98a96'
    },
    logo: BscIcon
  }
};

interface SeasonalABIS {
  [key: string]: any;
};
export const contractABIs: SeasonalABIS = {
  SPRING: seasonalTokenABI,
  SUMMER: seasonalTokenABI,
  AUTUMN: seasonalTokenABI,
  WINTER: seasonalTokenABI,
  ETH_BRIDGE: ethBridgeABI,
  BSC_BRIDGE: bscBridgeABI
}

export const enabledNetworkIds: NetworkId[] = Object.keys(networks).map(networkId => parseInt(networkId)).filter(networkId => networks[networkId].isEnabled);
