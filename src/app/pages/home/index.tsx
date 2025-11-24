import type { ReactNode } from "react";
import { Card, Chip, Container, Stack, Typography } from "@mui/material";

import { HomeSearch } from "./search";
import { data } from "../../data";

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
    return (
        <HomeLayout
            search={<HomeSearch options={data} />}
            suggestions={
                <>
                    <Typography variant="h5" gutterBottom>
                        Suggestions
                    </Typography>
                    <Stack gap={2}>
                        {data.map((plant) => (
                            <PlantCard
                                title={<Typography>{plant.title}</Typography>}
                                season={plant.season}
                                lifecycle={plant.lifecycle}
                            />
                        ))}
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
