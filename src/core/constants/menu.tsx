import { MenuuItemProp, RouteItemProp } from "../interfaces/base";
import { RegistrationPage } from "../../pages/registration";
import { FundRaisersPage } from "../../pages/fundraisers";
import { CharitiesPage } from "../../pages/charities";
import { DonationPage } from "../../pages/donation";
import { AdminsPage } from "../../pages/admins";
import { PhotoUpload } from "../../components/photoUpload";
import { AboutPage } from "../../pages/about";
import { HomePage } from "../../pages/home";
import { CelebratePage } from "../../pages/celebration";
import { AllCharitiesPage } from "../../pages/allCharities";

export const routeItems: RouteItemProp[] = [
    {
        url: '/',
        owner: 0,
        element: <HomePage />
    },
    {
        url: '/registration/:feature',
        owner: 0,
        element: <RegistrationPage />
    },
    {
        url: '/fundraisers',
        owner: 0,
        element: <FundRaisersPage />
    },
    {
        url: '/charities',
        owner: 0,
        element: <CharitiesPage />
    },
    {
        url: '/donate/:index',
        owner: 0,
        element: <DonationPage />
    },
    {
        url: '/admins',
        owner: 3,
        element: <AdminsPage />
    },
    {
        url: '/about',
        owner: 0,
        element: <AboutPage />
    },
    {
        url: '/all',
        owner: 0,
        element: <AllCharitiesPage />
    },
    {
        url: '/celebrate',
        owner: 0,
        element: <CelebratePage />
    }
];