import Web3 from 'web3';

import { contractABIs, networks, FromNetwork, tokenList } from '../../networks';
import { chains } from '../../providers';

const connectWeb3 = new Web3(chains[FromNetwork].rpcUrls[0]);

export {connectWeb3};

export const getContract = (type: string) => {
    const connectWeb3 = new Web3(Web3.givenProvider);
    return new connectWeb3.eth.Contract(contractABIs[type], networks[FromNetwork].addresses[type]);
};

export const getTokenContract = (index: number) => {
    const connectWeb3 = new Web3(Web3.givenProvider);
    console.log(tokenList[index].address[FromNetwork]);
    return new connectWeb3.eth.Contract(tokenList[index].abi, tokenList[index].address[FromNetwork]);
}
