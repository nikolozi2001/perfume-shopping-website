import { lazy } from "react";

// Lazy load water sub-components
const FragranceSets = lazy(() => import("./Fragrance_Sets/FragranceSets"));

const giftSetsRoutes = [
  {
    path: "fragrance_sets",
    element: <FragranceSets />,
    handle: {
      title: "Fragrance Gift Sets",
      description: "Explore our collection of fragrance gift sets",
    },
  },
];

export default giftSetsRoutes;
