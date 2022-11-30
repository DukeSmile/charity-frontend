export interface MenuuItemProp {
    name: string;
    owner: number;
    url: string;
}

export interface RouteItemProp {
    url: string;
    owner: number;
    element: JSX.Element;
}

export interface charityProp {
    id: string;
    index: number;
    contract: any;
    wallet_address: string;
    charity_type: number | '0' | '1';
    fund_type: string;
    goal: number;
    name: string;
    photo: string;
    summary: string;
    detail: string;
    country: string;
    location: string;
    email: string;
    website: string;
    phone: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    title: string;
    twitter: string;
    vip: string;
    createDateTime: string;
}

export const demoCharity: charityProp = {
    id: '',
    index: -1,
    contract: {
        walletAddress: '',
        donateType: 'health',
        photo: '',
        fund: '0',
        goal: '0'
    },
    wallet_address: '',
    charity_type: 0,
    fund_type: '',
    goal: 0,
    name: '',
    photo: '',
    summary: '',
    detail: '',
    country: '',
    location: '',
    email: '',
    website: '',
    phone: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    title: '',
    twitter: '',
    vip: '',
    createDateTime: '',
}
export interface adminUserProp {
    index: number;
    name: string;
    address: string;
}

export interface adminUserProp {
    index: number;
    address: string;
}

interface networkTokenProp {
    [key: number]: string
}
export interface tokenProp {
    img: any;
    name: string;
    abi: any;
    address: networkTokenProp;
}

export interface donationProp {
    transaction: string;
    from: string;
    to: string;
    currency: string;
    amount: string;
    timeStamp: number;
}

export interface fundTypeProp {
    title: string;
    img: string;
    detail: string;
    type: string;
    count: number;
}

export interface loginUserProp {
    id: string;
    wallet_address: string;
    charity_type: number;
    goal: number;
    fund_type: string;
    name: string;
    title: string;
    photo: string;
    country: string;
    location: string;
    email: string; // charity information
    summary: string;
    detail: string;
    vip: string; // charity information
    website: string; // charity information
    phone: string; // charity information
    linkedin: string; // charity information
    twitter: string; // charity information
    facebook: string; // charity information
    instagram: string; // charity information
    created_at: string;
}
