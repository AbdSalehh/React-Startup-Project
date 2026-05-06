import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./provider/routes";
import { AuthInitializer } from "./provider/AuthInitializer";
import { Analytics } from "./provider/Analytics";
import { Toaster } from "@/shared/ui/sonner";
import { ThemeProvider } from "@/shared/hooks";

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Analytics />
        <AuthInitializer>
          <RouterProvider router={router} />
          <Toaster richColors visibleToasts={1} />
        </AuthInitializer>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
