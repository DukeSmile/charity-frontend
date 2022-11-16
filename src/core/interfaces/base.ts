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
    address: string;
    catalog: any
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
}