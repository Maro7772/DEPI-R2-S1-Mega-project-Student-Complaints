import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "@layouts/index";

import Dashboard from "@pages/Dashboard";
import Complaints from "@pages/Complaints";
import Settings from "@pages/Settings";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Error from "@pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Dashboard
      },
      {
        path: "dashboard",
        Component: Dashboard
      },
      {
        path: "complaints",
        Component: Complaints
      },
      {
        path: "settings",
        Component: Settings
      }
    ]
  },
  {
    path: "login",
    Component: Login
  },
  {
    path: "register",
    Component: Register
  }
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
