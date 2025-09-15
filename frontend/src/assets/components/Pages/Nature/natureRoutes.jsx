import { lazy } from "react";

// Lazy load nature sub-components
const ProtectedAreas = lazy(() => import("./ProtectedAreas/ProtectedAreas"));
const ForestAndFieldFires = lazy(() => import("./ForestAndFieldFires/ForestAndFieldFires"));
const ForestArea = lazy(() => import("./ForestArea/ForestArea"));

const natureRoutes = [
  {
    path: "protectedareas",
    element: <ProtectedAreas />,
    handle: {
      title: "Protected Areas and National Parks",
      description: "Information on protected natural areas and conservation zones"
    }
  },
  {
    path: "forestarea",
    element: <ForestArea />,
    handle: {
      title: "Forest Area and Coverage",
      description: "Forest coverage statistics and deforestation data"
    }
  },
  {
    path: "forestandfieldfires",
    element: <ForestAndFieldFires />,
    handle: {
      title: "Forest and Field Fire Incidents",
      description: "Wildfire incidents and forest fire prevention data"
    }
  },
];

export default natureRoutes;
