import { MenuuItemProp, RouteItemProp } from "../interfaces/base";
import { RegistrationPage } from "../../pages/user/registration";
import { FundRaisersPage } from "../../pages/user/fundraisers";
import { CharitiesPage } from "../../pages/user/charities";
import { DonationPage } from "../../pages/donation";
import { AdminsPage } from "../../pages/user/admins";
import { PhotoUpload } from "../../components/photoUpload";
import { AboutPage } from "../../pages/about";
import { HomePage } from "../../pages/home";
import { CelebratePage } from "../../pages/user/celebration";
import { FilterCharitiesPage } from "../../pages/filter/filterPage";
import { DetailPage } from "../../pages/detailPage";
import { UserPage } from "../../pages/user";
export const routeItems: RouteItemProp[] = [
    {
        url: '/',
        owner: 0,
        element: <HomePage />
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
    },
    {
        url: '/user/:action',
        owner: 0,
        element: <UserPage />
    }
];