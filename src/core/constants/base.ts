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
    return new connectWeb3.eth.Contract(tokenList[index].abi, tokenList[index].address[FromNetwork]);
}

export const roleList:{[key:string]: string} = {
    'owner': '0xb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e',
    'admin': '0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775'
};


export const birthDDAContractNumber = 24268944;
export const maximumAllDoantion = 20;
export const projectId = '1qmt...XXX';
export const projectSecret = 'c920...XXX';