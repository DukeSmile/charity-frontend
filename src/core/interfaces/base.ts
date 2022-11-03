export interface MenuuItemProp {
    name: string;
    url: string;
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
    address: string;
    name: string;
}