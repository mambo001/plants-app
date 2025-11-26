import type { ReactNode } from "react";
import { Container, Skeleton, Stack, Typography } from "@mui/material";

import { HomeSearch } from "./search";
import { usePlantsContext } from "../../context";
import { PlantCard } from "./plant-card";

export function Home() {
  const plants = usePlantsContext();
  return (
    <HomeLayout
      search={<HomeSearch options={plants} />}
      suggestions={
        <>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Suggestions
          </Typography>
          <Stack
            gap={2}
            direction={"row"}
            sx={{
              flexWrap: "wrap",
            }}
          >
            {plants && plants.length < 1 ? (
              <>
                <Skeleton variant="rectangular" height={120} />
                <Skeleton variant="rectangular" height={120} />
                <Skeleton variant="rectangular" height={120} />
                <Skeleton variant="rectangular" height={120} />
                <Skeleton variant="rectangular" height={120} />
              </>
            ) : (
              plants
                .slice(0, 6)
                .map((plant) => (
                  <PlantCard
                    key={plant.title}
                    title={plant.title}
                    lifecycle={plant.lifecycle}
                    sun={plant.sun}
                    water={plant.water}
                    season={plant.season}
                    planting={plant.planting}
                    soil={plant.soil}
                  />
                ))
            )}
          </Stack>
        </>
      }
    />
  );
}

interface HomeLayoutProps {
  search: ReactNode;
  suggestions: ReactNode;
}

function HomeLayout(props: HomeLayoutProps) {
  return (
    <Container
      sx={{
        maxWidth: {
          xs: "100%",
          sm: "500px",
          md: "750px",
          lg: "800px",
          xl: "800px",
        },
      }}
    >
      <Stack marginTop={2} paddingBottom={4} gap={2}>
        {props.search}
        {props.suggestions}
      </Stack>
    </Container>
  );
}
