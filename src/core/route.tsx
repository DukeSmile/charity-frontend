import { createBrowserRouter } from "react-router-dom";
import { RegistrationPage } from "../pages/user/registration";
import { FundRaisersPage } from "../pages/user/fundraisers";
import { CharitiesPage } from "../pages/user/charities";
import { DonationPage } from "../pages/donation";

export const siteRouter = createBrowserRouter([
    {
      path: "/fundraisers",
      element: <FundRaisersPage />
    },
    {
      path: "/charities",
      element: <CharitiesPage />
    },
    {
      path: "/donation",
      element: <DonationPage />
    }
]);
