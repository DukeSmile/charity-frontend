import { MenuuItemProp, RouteItemProp } from "../interfaces/base";
import { RegistrationPage } from "../../pages/registration";
import { FundRaisersPage } from "../../pages/fundraisers";
import { CharitiesPage } from "../../pages/charities";
import { DonationPage } from "../../pages/donation";
import { AdminsPage } from "../../pages/admins";
import { PhotoUpload } from "../../components/photoUpload";
import { AboutPage } from "../../pages/about";

export const menuItems: MenuuItemProp[] = [
    {
        name: 'Registration',
        url: '/registration'
    },
    {
        name: 'FundRaisers',
        url: '/fundraisers'
    },
    {
        name: 'Charities',
        url: '/charities'
    },
    {
        name: 'Admins',
        url: '/admins'
    },
    {
        name: 'About',
        url: '/about'
    }
];

export const routeItems: RouteItemProp[] = [
    {
        url: '/registration',
        element: <RegistrationPage />
    },
    {
        url: '/fundraisers',
        element: <FundRaisersPage />
    },
    {
        url: '/charities',
        element: <CharitiesPage />
    },
    {
        url: '/donate/:index',
        element: <DonationPage />
    },
    {
        url: '/admins',
        element: <AdminsPage />
    },
    {
        url: '/about',
        element: <AboutPage />
    }
];