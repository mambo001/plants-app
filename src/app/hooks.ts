import { useQuery } from "@tanstack/react-query";

import type { Plant } from "./types";
import { API_URL } from "../environment";

export function usePlants() {
  return useQuery<Plant[]>({
    queryKey: ["plants"],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch plants data");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function usePlant(plantId: string) {
  const { data: plants } = usePlants();
  return plants?.find((plant) => plant.title === plantId);
}
