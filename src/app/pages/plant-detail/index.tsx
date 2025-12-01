import type { ReactNode } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Grid4x4OutlinedIcon from "@mui/icons-material/Grid4x4Outlined";
import TakeoutDiningOutlinedIcon from "@mui/icons-material/TakeoutDiningOutlined";
import { useNavigate, useParams } from "react-router";

import { usePlantsContext } from "../../context";
import { IconLabel } from "../../components";

function formatCompanionPlants(plants: string): string {
  return plants.trim().split(",").join(", ");
}

function LabeledValue(props: { label: string; value: ReactNode }) {
  return (
    <Stack>
      <Typography variant="body2" color="textSecondary">
        {props.label}
      </Typography>
      {props.value}
    </Stack>
  );
}

export function PlantDetail() {
  const navigate = useNavigate();
  const { plantId = "" } = useParams();
  const plants = usePlantsContext();
  const plant = plants.find((plant) => plant.title === plantId);

  if (!plant) {
    return <PlantDetailLoading />;
  }

  return (
    <PlantDetailLayout
      header={
        <Stack gap={2} alignItems={"flex-start"} paddingBottom={2}>
          <Button
            onClick={() => navigate(-1)}
            variant="text"
            startIcon={<ArrowBackOutlinedIcon />}
          >
            Back
          </Button>
          <Stack>
            <Typography variant="h5">{plantId}</Typography>
            <Typography variant="body2" color="textSecondary">
              {plant.lifecycle}
            </Typography>
          </Stack>
        </Stack>
      }
      requirementsSection={
        <Card>
          <CardContent>
            <Stack gap={2}>
              <Typography variant="body1" color="textSecondary">
                Growing Requirements
              </Typography>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack flex={1} gap={1}>
                  <LabeledValue
                    label="Sunlight: "
                    value={
                      <IconLabel
                        icon={
                          <WbSunnyOutlinedIcon
                            sx={{
                              color: "#FB923C",
                            }}
                            fontSize="small"
                          />
                        }
                        label={plant.sun}
                      />
                    }
                  />
                  <LabeledValue
                    label="Water: "
                    value={
                      <IconLabel
                        icon={
                          <WaterDropOutlinedIcon
                            sx={{
                              color: "#60a5fa",
                            }}
                            fontSize="small"
                          />
                        }
                        label={plant.water}
                      />
                    }
                  />
                  <LabeledValue
                    label="Water: "
                    value={
                      <IconLabel
                        icon={
                          <CalendarTodayOutlinedIcon
                            color="info"
                            fontSize="small"
                          />
                        }
                        label={`${plant.season}(${plant.planting})`}
                      />
                    }
                  />
                </Stack>
                <Stack flex={1} gap={1}>
                  <LabeledValue
                    label="Soil Type: "
                    value={
                      <IconLabel
                        icon={
                          <GrassOutlinedIcon color="primary" fontSize="small" />
                        }
                        label={plant.soil}
                      />
                    }
                  />
                  <LabeledValue
                    label="Spacing: "
                    value={
                      <IconLabel
                        icon={
                          <Grid4x4OutlinedIcon
                            color="primary"
                            fontSize="small"
                          />
                        }
                        label={plant.spacing}
                      />
                    }
                  />
                  <LabeledValue
                    label="Container Size: "
                    value={
                      <IconLabel
                        icon={
                          <TakeoutDiningOutlinedIcon
                            color="primary"
                            fontSize="small"
                          />
                        }
                        label={plant.potSize}
                      />
                    }
                  />
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      }
      additionalInfoSection={
        <Card>
          <CardContent>
            <Stack gap={2}>
              <Typography variant="body1" color="textSecondary">
                Additional Info
              </Typography>
              <Stack gap={2} direction={"row"} justifyContent={"space-between"}>
                <Stack flex={1} gap={1}>
                  <LabeledValue
                    label="Edible Parts: "
                    value={
                      <Typography variant="body1">
                        {plant.edibleParts}
                      </Typography>
                    }
                  />
                  <LabeledValue
                    label="Companion Plants: "
                    value={
                      <Typography variant="body1">
                        {formatCompanionPlants(plant.companionPlants)}
                      </Typography>
                    }
                  />
                </Stack>
                <Stack flex={1} gap={1}>
                  <LabeledValue
                    label="Fertilizer Needs: "
                    value={
                      <Typography variant="body1">
                        {plant.fertilizerNeeds}
                      </Typography>
                    }
                  />

                  <LabeledValue
                    label="Notes: "
                    value={
                      <Typography variant="body1">{plant.notes}</Typography>
                    }
                  />
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      }
    />
  );
}

function PlantDetailLoading() {
  const navigate = useNavigate();

  return (
    <PlantDetailLayout
      header={
        <Stack gap={2} alignItems={"flex-start"}>
          <Button
            onClick={() => navigate(-1)}
            variant="text"
            startIcon={<ArrowBackOutlinedIcon />}
          >
            Back
          </Button>
          <Skeleton
            variant="text"
            sx={{
              fontSize: "2rem",
            }}
            width={240}
          />
        </Stack>
      }
      requirementsSection={
        <>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Requirements
          </Typography>
          <Stack gap={2}>
            <Skeleton variant="rectangular" height={120} />
            <Skeleton variant="rectangular" height={120} />
          </Stack>
        </>
      }
      additionalInfoSection={
        <>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Additional Info
          </Typography>
          <Stack gap={2}>
            <Skeleton variant="rectangular" height={120} />
            <Skeleton variant="rectangular" height={120} />
          </Stack>
        </>
      }
    />
  );
}

interface PlantDetailLayoutProps {
  header: ReactNode;
  requirementsSection: ReactNode;
  additionalInfoSection: ReactNode;
}

function PlantDetailLayout(props: PlantDetailLayoutProps) {
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
      disableGutters
    >
      <Stack marginTop={2} paddingBottom={4} gap={2}>
        {props.header}
        {props.requirementsSection}
        {props.additionalInfoSection}
      </Stack>
    </Container>
  );
}
