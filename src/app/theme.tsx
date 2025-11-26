import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#386641ff",
    },
    secondary: {
      main: "#6a994eff",
    },
    info: {
      main: "#a7c957ff",
    },
    error: {
      main: "#bc4749ff",
    },
    warning: {
      main: "#f2e8cfff",
    },
  },
  typography: {
    // fontFamily: "'Inter', sans-serif",
  },
});

// --hunter-green: #386641ff;
// --sage-green: #6a994eff;
// --yellow-green: #a7c957ff;
// --vanilla-cream: #f2e8cfff;
// --blushed-brick: #bc4749ff;
