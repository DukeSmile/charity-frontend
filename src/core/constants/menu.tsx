import { MenuuItemProp } from "../interfaces/base";
import { RegistrationPage } from "../../pages/registration";
import { FundRaisersPage } from "../../pages/fundraisers";
import { CharitiesPage } from "../../pages/charities";
import { DonationPage } from "../../pages/donation";

export const menuItems: MenuuItemProp[] = [
    {
        name: 'Registration',
        url: '/registration',
        element: <RegistrationPage />
    },
    {
        name: 'FundRaisers',
        url: '/fundraisers',
        element: <FundRaisersPage />
    },
    {
        name: 'Charities',
        url: '/charities',
        element: <CharitiesPage />
    },
    {
        name: 'Donation',
        url: '/donate/:index',
        element: <DonationPage />
    }
];