import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PlantsProvider } from "./context";
import { Home } from "./pages/home";
import { AppBar } from "./app-bar";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./theme";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PlantsProvider>
        <ThemeProvider theme={appTheme}>
          <AppBar>
            <Home />
          </AppBar>
        </ThemeProvider>
      </PlantsProvider>
    </QueryClientProvider>
  );
}
