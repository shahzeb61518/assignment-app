import React from "react";

import { ROUTES } from "../helpers/RoutePaths";
const Products = React.lazy(() => import("./../views/pages/products-list"));

const routes = [
  {
    path: ROUTES.products,
    exact: true,
    name: "Products-List",
    component: Products,
  },
];

export default routes;
