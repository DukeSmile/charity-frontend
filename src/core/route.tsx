import { createBrowserRouter } from "react-router-dom";
import { RegistrationPage } from "../pages/registration";
import { FundRaisersPage } from "../pages/fundraisers";
import { CharitiesPage } from "../pages/charities";
import { DonationPage } from "../pages/donation";

export const siteRouter = createBrowserRouter([
    {
      path: "/registry",
      element: <RegistrationPage />
    },
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
