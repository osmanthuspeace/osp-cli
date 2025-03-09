import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Project from "../pages/Project";
import User from "../pages/User";
import NotFound from "../pages/NotFound";
import Setting from "../pages/Setting";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Project /> },
      { path: "project", element: <Project /> },
      { path: "user", element: <User /> },
      { path: "setting", element: <Setting /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
export default function Router() {
  return <RouterProvider router={routes} />;
}
