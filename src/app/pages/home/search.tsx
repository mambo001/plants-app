import { useMemo, useState, type SyntheticEvent } from "react";
import {
  TextField,
  Autocomplete,
  Card,
  Typography,
  Stack,
  Skeleton,
  Box,
} from "@mui/material";
import Fuse, { type FuseResult } from "fuse.js";

import type { Plant } from "../../types";
import { PlantCard } from "./plant-card";

export function HomeSearch(props: { options: Plant[] }) {
  const autocompleteOptions = props.options.map((option) => option.title);
  const fuse = new Fuse(autocompleteOptions, {
    includeScore: true,
    shouldSort: true,
    threshold: 0.4,
  });
  const [result, setResult] = useState<FuseResult<string>[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [searchInputValue, setSearchInputValue] = useState<string | null>(null);

  const handleInputChange = (
    _: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    console.log({ value });
    if (value === "") {
      setResult([]);
    }
    setSearchInputValue(value);
    const fuseResults = fuse.search(value || "");
    setResult(fuseResults);
  };

  const handleOnChange = (
    _: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setSearchValue(value);
    const fuseResults = fuse.search(value || "");
    setResult(fuseResults);
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
      return (
        <Typography variant="body2">
          Start typing to search for plants
        </Typography>
      );
    }
    if (mappedResults.length === 0) {
      return <Typography>No results found</Typography>;
    }
    return mappedResults.map((plant) => {
      if (!plant) return null;
      return (
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
      );
    });
  };

  const renderAutocomplete = () =>
    props.options.length > 0 ? (
      <Autocomplete
        freeSolo
        options={autocompleteOptions}
        onInputChange={handleInputChange}
        value={searchValue}
        onChange={handleOnChange}
        renderInput={(params) => <TextField {...params} label="ex: Cilantro" />}
      />
    ) : (
      <Skeleton variant="rectangular" height={56} />
    );
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
        {renderAutocomplete()}
        <Box>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Results
          </Typography>
          <Stack
            gap={2}
            direction={"row"}
            sx={{
              flexWrap: "wrap",
            }}
          >
            {renderResults()}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}
