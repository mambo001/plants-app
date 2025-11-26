import type { ReactNode } from "react";
import { Stack } from "@mui/material";

export function IconLabel(props: { icon: ReactNode; label: ReactNode }) {
  return (
    <Stack direction={"row"} alignItems="center" gap={0.5}>
      {props.icon}
      {props.label}
    </Stack>
  );
}
