import type { ReactNode } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
  type ChipOwnProps,
} from "@mui/material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import { IconLabel } from "../../components";

function getLifeCycleColor(lifecycle: string): ChipOwnProps["color"] {
  switch (lifecycle.toLowerCase()) {
    case "annual":
      return "error";
    case "perennial":
      return "primary";
    case "biennial":
      return "error";
    default:
      return "default";
  }
}

export interface PlantCardProps {
  title: ReactNode;
  lifecycle: string;
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
          md: "31.75%",
          lg: "31.75%",
          xl: "31.75%",
        },
        minHeight: 150,
      }}
    >
      <CardActionArea
        href={`#/plant/${encodeURIComponent(String(props.title))}`}
      >
        <CardHeader
          title={
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems={"center"}
              gap={1}
            >
              <Typography variant="body1">{props.title}</Typography>
              <Chip
                size="small"
                label={
                  <Typography variant="caption">{props.lifecycle}</Typography>
                }
                color={getLifeCycleColor(props.lifecycle)}
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
                label={<Typography variant="body2">{props.sun}</Typography>}
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
                label={<Typography variant="body2">{props.water}</Typography>}
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
                label={
                  <Typography variant="body2">
                    {props.season}({props.planting})
                  </Typography>
                }
              />
              <IconLabel
                icon={<GrassOutlinedIcon color="primary" fontSize="small" />}
                label={<Typography variant="body2">{props.soil}</Typography>}
              />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
