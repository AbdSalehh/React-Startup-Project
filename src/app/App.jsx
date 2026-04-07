import { RouterProvider } from "react-router";
import { router } from "./provider/routes";
import { AuthInitializer } from "./provider/AuthInitializer";
import { Toaster } from "@/shared/ui/sonner";

const App = () => {
  return (
    <AuthInitializer>
      <RouterProvider router={router} />
      <Toaster richColors visibleToasts={1} />
    </AuthInitializer>
  );
};

export default App;
