import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PlantsProvider } from "./context";
import { Home } from "./pages/home";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PlantsProvider>
        <Home />
      </PlantsProvider>
    </QueryClientProvider>
  );
}
