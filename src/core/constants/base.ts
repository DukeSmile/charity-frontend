import { JsonRpcProvider } from '@ethersproject/providers';
import Web3 from 'web3';

import { contractABIs, networks, FromNetwork, tokenList } from '../../networks';
import { chains } from '../../providers';
import { fundTypeProp } from '../interfaces/base';

export const baseServerUrl = 'http://95.216.95.180/api';
// export const baseServerUrl = 'http://localhost:3100/api';

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
    'admin': '0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775',
    'charity': '0x838cb9e68162e54d2dfda44baa96273d8a6cb729c0d42995215e0f52841feb77',
    'black': '0x5b326b543500ae5b817995ef8271cedfc72db65652666aced238ae8d58d8b949'
};

export const birthDDAContractNumber = 8022000;
export const maximumAllDoantion = 10;
export const projectId = '2HE3I80EtQeKwCEjmvXVxWooFzx';
export const projectSecret = '6691d66e4959b01f15a45bbe767326e9';
export const ethTokenAddr = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const WEB3_SIGN_MESSAGE = "Welcome to DDA project!\n\nTo get started, click Sign In and accept  Service\n\nThis request will not trigger a blockchain transaction or cost any gas fees.";

export const handleSignMessage = async (
  address: string,
  provider: JsonRpcProvider
): Promise<string> => {
  const signer = provider.getSigner(address);
  try {
    return (await signer.signMessage(WEB3_SIGN_MESSAGE)) as string;
  } catch (e) {
    return "";
  }
};

export const menuFundTypes:string [] = [
    'animal', 'arts', 'community', 'education', 'environmental'
];

export const blogFundTypes:string [] = [
    'education', 'business', 'animal', 'environmental', 'family', 'nonprofit', 'medical'
];

export const raiserFundTypes: string [] = [
    'family', 'personal', 'education', 'volunteer'
];

export const allFundTypes: {[key:string]: fundTypeProp} = {
    animal: {
        title: 'animal',
        img: 'animal',
        type: 'charities',
        detail: '',
        count: 0
    },
    arts: {
        title: 'Arts and culture',
        img: 'health',
        type: 'charities',
        detail: '',
        count:0
    },
    community: {
        title: 'Community development',
        img: 'health',
        type: 'charities',
        detail: '',
        count:0
    },
    education: {
        title: 'education',
        img: 'education',
        type: 'charities',
        detail: 'We’ve talked quite a bit about all the different ways you can lend support and live generously.',
        count:0
    },
    environmental: {
        title: 'environmental',
        img: 'environmental',
        type: 'charities',
        detail: '',
        count: 0
    },
    health: {
        title: 'health',
        img: 'health',
        type: 'charities',
        detail: '',
        count:0
    },
    human: {
        title: 'human',
        img: 'personal',
        type: 'services',
        detail: 'We’ve talked quite a bit about all the different ways you can lend support and live generously.',
        count: 0
    },
    international: {
        title: 'international',
        img: 'health',
        type: 'NGOs',
        detail: '',
        count:0
    },
    volunteer: {
        title: 'volunteer',
        img: 'volunteer',
        type: 'charities',
        detail: 'We’ve talked quite a bit about all the different ways you can lend support and live generously.',
        count: 0
    },
    family: {
        title: 'family and friend',
        img: 'family',
        type: 'Personal Fundraising',
        detail: 'We’ve talked quite a bit about all the different ways you can lend support and live generously.',
        count: 0
    },
    medical: {
        title: 'medical',
        img: 'medical',
        type: 'charities',
        detail: '',
        count: 0
    },
    emergency: {
        title: 'emergency',
        img: 'emergency',
        type: 'charities',
        detail: '',
        count: 0
    },
    memorial: {
        title: 'memorial',
        img: 'memorial',
        type: 'charities',
        detail: '',
        count: 0
    },
    nonprofit: {
        title: 'non-profit',
        img: 'nonprofit',
        type: 'charities',
        detail: '',
        count: 0
    },
    relief: {
        title: 'crisis relief',
        img: 'relief',
        type: 'charities',
        detail: '',
        count: 0
    },
    business: {
        title: 'business',
        img: 'business',
        type: 'charities',
        detail: '',
        count: 0
    }
};

export const aboutStrs:string [] = [
    'In todays world many regular people are still generally unaware or uncertain of cryptocurrency and the role that blockchain technology will play in our future. The best way to spread the word and bridge the gap between IRL and crypto isn’t for them to read about multimillion dollar hacks on the mainstream media. For this reason Okapi has decided it is important for us to have a long-lasting positive effect on society using blockchain technology to spread love, kindness, and good will. We know that currently charity/relief organizations can be hard to access, and even harder to donate too; especially with large amounts of money.',
    'For example those who want to donate to a charitable organization must provide all of their personal information, and then use either credit card, bank transfer, or PayPal. All of these methods take time, require patience, and also require personal information which many people find intrusive thus discouraging them to leave a donation.',
    'But what if we could streamline the process?',
    'The Okapi team is creating a truly decentralized donation platform that anyone in the world can access with the click of a button using immutable blockchain technology to donate in a matter of seconds.. This would allow individuals to donate and provide instant relief to whichever organization they choose without compromising personal information that is both sensitive and private in nature. There’s also another problem with the current centralized system that we have come across; In order to make charitable donations, you need to have a bank account which you then have to use to send money to PayPal, do a direct wire transfer, or top up your credit card with after leaving the donation. This leaves the unbanked with absolutely no way to donate to charitable organizations, even if they feel the need to help and have decided they want to do so.',
    'Having registered charitable organizations on a decentralized platform will allow people worldwide to leave easy one click donations using blockchain technology. This will be revolutionary for those who aren’t able to access a bank account, or don’t feel comfortable providing sensitive personal information like credit card and bank account numbers. These donations will also allow the donor to declare a tax deduction if they so choose by providing the transaction hash to their local tax authorities. All of this can be done in a split second with the click of a button on the Okapi decentralized donation app providing instant relief worldwide to any organization from any individual with internet access..',
    'Donations will be taken in the form of verified ERC-20 tokens that have been verified by the Okapi team and listed on the DDA platform. After connecting your metamask wallet to the DDA platform, you will simply have to choose the cryptocurrency you wish to donate and the number of tokens to be donated to the organization of your choosing. Once you have approved the transaction, the tokens will be sent to the charitable organization directly from your wallet and the successful transaction hash will immediately be shown as proof for both peace of mind and tax purposes should you choose to declare the donation.',
    '(Above subject to change based on dev developing app)',
    'You might be wondering, “how does this benefit Okapi holders, how will this make me money”…',
    'Don’t worry, we’ve thought about that as well. We plan on using a tiered donation structure that is pro-rata depending on the amount being donated, of which a small portion will be used to buyback and burn Okapi tokens on the open market. Thus giving Okapi a rising price floor while also being fair towards the charitable organization receiving the donation. Our goal is not only to pump the price for Okapi investors, but to give them peace of mind knowing that our utilities will help save others and do something good for society as a whole.',
    '1% of all donations below 10k will be used to buy back and burn Okapi tokens on the open market',
    '.7% of all donations between 10-50k will be used to buy back and burn Okapi tokens on the open market',
    '.5% of all donations between 50-100k will be used to buy back and burn Okapi tokens on the open market',
    '.3% of all donations between 100-250k will be used to buy back and burn Okapi tokens on the open market',
    '.1% of all donations above 250k will be used to buy back and burn Okapi tokens on the open market'
];

export const monthLabels: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];