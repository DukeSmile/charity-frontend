import { MenuuItemProp, RouteItemProp } from "../interfaces/base";
import { RegistrationPage } from "../../pages/registry/registration";
import { FundRaisersPage } from "../../pages/registry/fundraisers";
import { CharitiesPage } from "../../pages/registry/charities";
import { DonationPage } from "../../pages/donation";
import { AdminsPage } from "../../pages/registry/admins";
import { PhotoUpload } from "../../components/photoUpload";
import { AboutPage } from "../../pages/about";
import { HomePage } from "../../pages/home";
import { CelebratePage } from "../../pages/registry/celebration";
import { FilterCharitiesPage } from "../../pages/filterPage";
import { DetailPage } from "../../pages/detailPage";
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
        url: '/detail/:index',
        owner: 0,
        element: <DetailPage />
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
        url: '/filter/:category',
        owner: 0,
        element: <FilterCharitiesPage />
    },
    {
        url: '/celebrate',
        owner: 0,
        element: <CelebratePage />
    }
];