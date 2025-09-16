import { lazy } from "react";

// Lazy load fragrance sub-components
const Women = lazy(() => import("./Women/Women"));
const Men = lazy(() => import("./Men/Men"));

const fragranceRoutes = [
  {
    path: "women",
    element: <Women />,
    handle: {
      title: "Women's Fragrance",
      description: "Explore our collection of women's fragrances"
    }
  },
  {
    path: "men",
    element: <Men />,
    handle: {
      title: "Men's Fragrance",
      description: "Explore our collection of men's fragrances"
    }
  },
];

export default fragranceRoutes;
