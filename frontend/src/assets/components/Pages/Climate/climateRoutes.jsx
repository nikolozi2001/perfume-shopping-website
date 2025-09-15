import { lazy } from "react";

// Lazy load climate sub-components
const Disasters = lazy(() => import("./Disasters/Disasters"));
const Temperature = lazy(() => import("./Temperature/Temperature"));

const climateRoutes = [
  {
    path: "disasters",
    element: <Disasters />,
    handle: {
      title: "Climate-Related Natural Disasters",
      description: "Data on climate-related disasters and extreme weather events"
    }
  },
  {
    path: "temperature",
    element: <Temperature />,
    handle: {
      title: "Temperature Data and Trends",
      description: "Historical and current temperature measurements and trends"
    }
  },
];

export default climateRoutes;
