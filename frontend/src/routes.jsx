import { Navigate } from "react-router-dom";
import { lazy } from "react";
import App from "./App";

// Lazy load components for better performance
const Homepage = lazy(() => import("./assets/components/Homepage/Homepage"));
const Air = lazy(() => import("./assets/components/Pages/Air/Air"));
const Climate = lazy(() => import("./assets/components/Pages/Climate/Climate"));
const Water = lazy(() => import("./assets/components/Pages/Water/Water"));
const Nature = lazy(() => import("./assets/components/Pages/Nature/Nature"));
const Energy = lazy(() => import("./assets/components/Pages/Energy/Energy"));
const Transport = lazy(() => import("./assets/components/Pages/Transport/Transport"));
const Waste = lazy(() => import("./assets/components/Pages/Waste/Waste"));
const Other = lazy(() => import("./assets/components/Pages/Other/Other"));
const Reports = lazy(() => import("./assets/components/Pages/Reports/Reports"));

// Import nested routes
import waterRoutes from "./assets/components/Pages/Water/waterRoutes";
import climateRoutes from "./assets/components/Pages/Climate/climateRoutes";
import natureRoutes from "./assets/components/Pages/Nature/natureRoutes";

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
          title: "IPKURE"
        }
      },
      { 
        path: "air", 
        element: <Air />,
        handle: {
          title: "Air Quality Data and Statistics"
        }
      },
      { 
        path: "climate", 
        element: <Climate />, 
        children: climateRoutes,
        handle: {
          title: "Climate Data and Analysis"
        }
      },
      { 
        path: "water", 
        element: <Water />, 
        children: waterRoutes,
        handle: {
          title: "Water Resources and Management"
        }
      },
      { 
        path: "nature", 
        element: <Nature />, 
        children: natureRoutes,
        handle: {
          title: "Nature and Biodiversity Data"
        }
      },
      { 
        path: "reports", 
        element: <Reports />,
        handle: {
          title: "Environmental Reports and Publications"
        }
      },
      { 
        path: "energy", 
        element: <Energy />,
        handle: {
          title: "Energy Consumption and Efficiency"
        }
      },
      { 
        path: "transport", 
        element: <Transport />,
        handle: {
          title: "Transportation and Emissions"
        }
      },
      { 
        path: "waste", 
        element: <Waste />,
        handle: {
          title: "Waste Management and Recycling"
        }
      },
      { 
        path: "other", 
        element: <Other />,
        handle: {
          title: "Additional Environmental Data"
        }
      },
      {
        path: "*",
        element: <Navigate to="/ge" replace />,
        handle: {
          title: "Page Not Found - Redirecting to Home"
        }
      }
    ],
  },
];

export default routes;
