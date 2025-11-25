import { createContext, useContext, type PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Plant } from "./types";
import { API_URL } from "../environment";

const PlantsContext = createContext<Plant[] | null>(null);

export function PlantsProvider(props: PropsWithChildren) {
  const { data: plants = [] } = useQuery<Plant[]>({
    queryKey: ["plants"],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch plants data");
      }
      return response.json();
    },
  });

  return (
    <PlantsContext.Provider value={plants}>
      {props.children}
    </PlantsContext.Provider>
  );
}

// eslint-disable-next-line
export const usePlantsContext = () => {
  const context = useContext(PlantsContext);
  if (context === null) {
    throw new Error("usePlantsContext must be used within a PlantsProvider");
  }
  return context;
};
