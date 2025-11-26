import type { ReactNode } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import { HomeSearch } from "./search";
import { usePlantsContext } from "../../context";

function IconLabel(props: { icon: ReactNode; label: ReactNode }) {
  return (
    <Stack direction={"row"} alignItems="center" gap={0.5}>
      {props.icon}
      <Typography variant="body2">{props.label}</Typography>
    </Stack>
  );
}

export interface PlantCardProps {
  title: ReactNode;
  lifecycle: ReactNode;
  sun: ReactNode;
  water: ReactNode;
  season: ReactNode;
  planting: ReactNode;
  soil: ReactNode;
}

export function PlantCard(props: PlantCardProps) {
  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          sm: "48%",
          md: "30%",
          lg: "30%",
          xl: "30%",
        },
        minHeight: 150,
      }}
    >
      <CardActionArea>
        <CardHeader
          title={
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems={"center"}
              gap={1}
            >
              {props.title}
              <Chip
                size="small"
                label={
                  <Typography variant="caption">{props.lifecycle}</Typography>
                }
                color="primary"
                variant="outlined"
              />
            </Stack>
          }
        />
        <CardContent sx={{ pt: 0 }}>
          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "column",
              lg: "row",
              xl: "row",
            }}
            justifyContent={"space-between"}
            gap={1.5}
          >
            <Stack
              direction={{
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
              }}
              gap={1.5}
              sx={{
                flexWrap: "wrap",
              }}
            >
              <IconLabel
                icon={
                  <WbSunnyOutlinedIcon
                    sx={{
                      color: "#FB923C",
                    }}
                    fontSize="small"
                  />
                }
                label={props.sun}
              />
              <IconLabel
                icon={
                  <WaterDropOutlinedIcon
                    sx={{
                      color: "#60a5fa",
                    }}
                    fontSize="small"
                  />
                }
                label={props.water}
              />
            </Stack>
            <Stack
              direction={{
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
              }}
              gap={1.5}
              sx={{
                flexWrap: "wrap",
              }}
            >
              <IconLabel
                icon={
                  <CalendarTodayOutlinedIcon color="info" fontSize="small" />
                }
                label={`${props.season}(${props.planting})`}
              />
              <IconLabel
                icon={<GrassOutlinedIcon color="primary" fontSize="small" />}
                label={props.soil}
              />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
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
                    title={<Typography>{plant.title}</Typography>}
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
          md: "600px",
          lg: "600px",
          xl: "600px",
        },
      }}
    >
      <Stack marginTop={2} gap={2}>
        {props.search}
        {props.suggestions}
      </Stack>
    </Container>
  );
}
