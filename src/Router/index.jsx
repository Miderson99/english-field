import { createBrowserRouter } from "react-router-dom";
import ImageAssociation from "../pages/ImageAssociation";
import DefaultLayout from "../components/Layouts/DefaultLayout/DefaultLayout";
import { Children } from "react";

const routes = [
  {
    path: "/",
    element: <ImageAssociation />,
    layout: "default",
  },

  {
    path: "/image-association",
    element: <ImageAssociation />,
    layout: "default",

},
  
];

const finalRoutes = routes.map((route) => {
    return {
      ...route,
      element: route.layout === "blank" ? "" : <DefaultLayout>{route.element}</DefaultLayout>,
    };
  });


const router = createBrowserRouter(finalRoutes);

export default router;