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
    index: number;
    charityType: number | '0' | '1';
    fund: string;
    fundType: string;
    address: string;
    catalog: any;
    goal: string;
}

export interface adminUserProp {
    index: number;
    name: string;
    address: string;
}

export interface adminUserProp {
    index: number;
    address: string;
    name: string;
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
