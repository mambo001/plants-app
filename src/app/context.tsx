import { createContext, useContext, type PropsWithChildren } from "react";

import type { Plant } from "./types";
import { usePlants } from "./hooks";

const PlantsContext = createContext<Plant[] | null>(null);

export function PlantsProvider(props: PropsWithChildren) {
  const { data: plants } = usePlants();

  return (
    <PlantsContext.Provider value={plants || []}>
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
