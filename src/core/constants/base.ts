import Web3 from 'web3';

import { contractABIs, networks, FromNetwork } from '../../networks';
import { chains } from '../../providers';

const ethWeb3 = new Web3(chains[FromNetwork].rpcUrls[0]);

export {ethWeb3};

export const getContract = (networkId:number, type: string) => {
    const connectWeb3 = new Web3(Web3.givenProvider);
    return new connectWeb3.eth.Contract(contractABIs[type], networks[networkId].addresses[type]);
};

