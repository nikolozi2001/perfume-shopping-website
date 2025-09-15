import { lazy } from "react";

// Lazy load water sub-components
const Majors = lazy(() => import("./Majors/Majors"));
const Protection = lazy(() => import("./Protection/Protection"));
const SupplyAndLosses = lazy(() => import("./SupplyAndLosses/SupplyAndLosses"));
const Trace = lazy(() => import("./Trace/Trace"));

const waterRoutes = [
  {
    path: "majors",
    element: <Majors />,
    handle: {
      title: "Major Water Bodies and Resources",
      description: "Data on major rivers, lakes, and water bodies"
    }
  },
  {
    path: "protection",
    element: <Protection />,
    handle: {
      title: "Water Resource Protection",
      description: "Water conservation and protection measures"
    }
  },
  {
    path: "supplyandlosses",
    element: <SupplyAndLosses />,
    handle: {
      title: "Water Supply and Distribution Losses",
      description: "Water supply systems and distribution efficiency"
    }
  },
  {
    path: "trace",
    element: <Trace />,
    handle: {
      title: "Water Quality Monitoring and Tracing",
      description: "Water quality monitoring and contamination tracking"
    }
  },
];

export default waterRoutes;
