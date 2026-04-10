import { RouterProvider } from "react-router";
import { router } from "./provider/routes";
import { AuthInitializer } from "./provider/AuthInitializer";
import { Toaster } from "@/shared/ui/sonner";
import { ThemeProvider } from "@/shared/hooks";

const App = () => {
  return (
    <ThemeProvider>
      <AuthInitializer>
        <RouterProvider router={router} />
        <Toaster richColors visibleToasts={1} />
      </AuthInitializer>
    </ThemeProvider>
  );
};

export default App;
