import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router";

import { PlantsProvider } from "./context";
import { Home } from "./pages/home";
import { AppBar } from "./components/app-bar";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./theme";
import { PlantDetail } from "./pages/plant-detail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export function AppInternal() {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AppBar>
              <Home />
            </AppBar>
          }
        />
        <Route path="plant">
          <Route
            path=":plantId"
            element={
              <AppBar>
                <PlantDetail />
              </AppBar>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PlantsProvider>
        <ThemeProvider theme={appTheme}>
          <HashRouter>
            <AppInternal />
          </HashRouter>
        </ThemeProvider>
      </PlantsProvider>
    </QueryClientProvider>
  );
}
