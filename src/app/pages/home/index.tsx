import type { ReactNode } from "react";
import {
  Card,
  Chip,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { HomeSearch } from "./search";
import { usePlantsContext } from "../../context";

export interface PlantCardProps {
  title: ReactNode;
  lifecycle: ReactNode;
  season: ReactNode;
}

export function PlantCard(props: PlantCardProps) {
  return (
    <Card sx={{ padding: 2 }}>
      <Stack gap={2}>
        {props.title}
        <Stack direction={"row"} gap={1}>
          <Chip label={props.season} variant="outlined" />
          <Chip label={props.lifecycle} variant="outlined" />
        </Stack>
      </Stack>
    </Card>
  );
}

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
          <Stack gap={2}>
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
                    title={<Typography>{plant.title}</Typography>}
                    season={plant.season}
                    lifecycle={plant.lifecycle}
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
          md: "600px",
          lg: "600px",
          xl: "600px",
        },
      }}
    >
      <Stack marginTop={25} gap={2}>
        {props.search}
        {props.suggestions}
      </Stack>
    </Container>
  );
}
