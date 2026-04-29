import { createBrowserRouter } from "react-router";
import { NotFoundPage } from "@/pages/not-found";
import authRoutes from "./auth.route";
import homeRoutes from "./home.route";
import chatRoutes from "./chat.route";

export const router = createBrowserRouter([
  ...authRoutes,
  ...homeRoutes,
  ...chatRoutes,
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
