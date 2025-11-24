import { useMemo, useState, type SyntheticEvent } from "react";
import {
    TextField,
    Autocomplete,
    Card,
    Typography,
    Stack,
    type AutocompleteInputChangeReason,
} from "@mui/material";
import Fuse, { type FuseResult } from "fuse.js";

import { PlantCard } from "./index";
import type { Plant } from "../../data";

export function HomeSearch(props: { options: Plant[] }) {
    const autocompleteOptions = props.options.map((option) => option.title);
    const fuse = new Fuse(autocompleteOptions);
    const [result, setResult] = useState<FuseResult<string>[]>([]);
    const [searchInputValue, setSearchInputValue] = useState<string | null>(
        null
    );

    const handleInputChange = (
        _: SyntheticEvent<Element, Event>,
        value: string,
        reason: AutocompleteInputChangeReason
    ) => {
        if (reason === "input") {
            const fuseResults = fuse.search(value);
            setResult(fuseResults);
        } else {
            setResult([]);
        }
    };

    const mappedResults = useMemo(
        () =>
            result.map((res) =>
                props.options.find((option) => option.title === res.item)
            ),
        [result, props.options]
    );

    const renderResults = () => {
        if (searchInputValue === null || searchInputValue === "") {
            return <Typography>Start typing to search for plants</Typography>;
        }
        if (mappedResults.length === 0) {
            return <Typography>No results found</Typography>;
        }
        return mappedResults.map((plant) => {
            if (!plant) return null;
            return (
                <PlantCard
                    key={plant.title}
                    title={<Typography>{plant.title}</Typography>}
                    season={plant.season}
                    lifecycle={plant.lifecycle}
                />
            );
        });
    };
    return (
        <Card
            variant="outlined"
            sx={{
                padding: 2,
            }}
        >
            <Stack gap={2}>
                <Typography variant="h4" gutterBottom>
                    Search plants
                </Typography>
                <Autocomplete
                    freeSolo
                    options={autocompleteOptions}
                    onInputChange={handleInputChange}
                    value={searchInputValue}
                    onChange={(_, value) => {
                        setSearchInputValue(value);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="ex: Cilantro" />
                    )}
                />
                <Card elevation={0}>
                    <Typography variant="h5" gutterBottom>
                        Results
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        mappedResults: {JSON.stringify(mappedResults, null, 2)}
                    </Typography>
                    <Stack gap={2}>{renderResults()}</Stack>
                </Card>
            </Stack>
        </Card>
    );
}
