import Web3 from 'web3';

import { SeasonalToken } from '../interfaces/base';
import { contractABIs, networks, FromNetwork} from '../../networks';
import { chains } from '../../providers';

import springImg from '../../assets/images/tokens/spring.png';
import summerImg from '../../assets/images/tokens/summer.png';
import autumnImg from '../../assets/images/tokens/autumn.png';
import winterImg from '../../assets/images/tokens/winter.png';

const ethWeb3 = new Web3(chains[FromNetwork].rpcUrls[0]);

export {ethWeb3};

export const getContract = (networkId:number, season: string) => {
    const connectWeb3 = new Web3(Web3.givenProvider);
    return new connectWeb3.eth.Contract(contractABIs[season], networks[networkId].addresses[season]);
};

export const SeasonalTokens: {[key: string]:SeasonalToken} = {
    
};

export const SwapTypes: {[key: string]:string} = {
    ETH_TO_BSC: 'eth-bsc',
    BSC_TO_ETH: 'bsc-eth',
    BIG_AMOUNT: 'big_amount',
}