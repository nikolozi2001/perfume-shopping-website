import { Navigate } from "react-router-dom";
import { lazy } from "react";
import App from "./App";

// Lazy load components for better performance
const Homepage = lazy(() => import("./assets/components/Homepage/Homepage"));
const Brands = lazy(() => import("./assets/components/Pages/Brands/Brands"));
const Fragrance = lazy(() =>
  import("./assets/components/Pages/Fragrance/Fragrance")
);
const GiftSets = lazy(() =>
  import("./assets/components/Pages/Gift_Sets/GiftSets")
);
const Contacts = lazy(() =>
  import("./assets/components/Pages/Contacts/Contacts")
);
const Offers = lazy(() => import("./assets/components/Pages/Offers/Offers"));

// Import nested routes
import giftSetsRoutes from "./assets/components/Pages/Gift_Sets/giftSetsRoutes";
import fragranceRoutes from "./assets/components/Pages/Fragrance/fragranceRoutes";

const routes = [
  {
    path: "/",
    element: <Navigate to="/ge" replace />,
  },
  {
    path: "/:language",
    element: <App />,
    errorElement: <div>Something went wrong with the application</div>,
    children: [
      {
        index: true,
        element: <Homepage />,
        handle: {
          title: "IPKURE",
        },
      },
      {
        path: "brands",
        element: <Brands />,
        handle: {
          title: "Brands",
        },
      },
      {
        path: "fragrance",
        element: <Fragrance />,
        children: fragranceRoutes,
        handle: {
          title: "Fragrance",
        },
      },
      {
        path: "gift_sets",
        element: <GiftSets />,
        children: giftSetsRoutes,
        handle: {
          title: "Gift Sets",
        },
      },

      {
        path: "offers",
        element: <Offers />,
        handle: {
          title: "Offers",
        },
      },
      {
        path: "contacts",
        element: <Contacts />,
        handle: {
          title: "Contacts",
        },
      },
      {
        path: "*",
        element: <Navigate to="/ge" replace />,
        handle: {
          title: "Page Not Found - Redirecting to Home",
        },
      },
    ],
  },
];

export default routes;
