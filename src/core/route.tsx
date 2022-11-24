import { createBrowserRouter } from "react-router-dom";
import { RegistrationPage } from "../pages/registry/registration";
import { FundRaisersPage } from "../pages/fundraisers";
import { CharitiesPage } from "../pages/registry/charities";
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
