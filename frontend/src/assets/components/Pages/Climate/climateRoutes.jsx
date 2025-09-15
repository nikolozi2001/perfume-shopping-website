import { lazy } from "react";

// Lazy load climate sub-components
const Disasters = lazy(() => import("./Disasters/Disasters"));
const Emissions = lazy(() => import("./Emissions/Emissions"));
const Precipitation = lazy(() => import("./Precipitation/Precipitation"));
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
  {
    path: "precipitation",
    element: <Precipitation />,
    handle: {
      title: "Precipitation and Rainfall Data",
      description: "Rainfall, snowfall, and precipitation patterns"
    }
  },
  {
    path: "emissions",
    element: <Emissions />,
    handle: {
      title: "Greenhouse Gas Emissions",
      description: "Carbon emissions and greenhouse gas monitoring"
    }
  },
];

export default climateRoutes;
