import { createTheme } from "@mui/material/styles";

//fontFamily
const font_family = "Nunito";

const theme = createTheme({
  typography: {
    fontFamily: [font_family, "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 425,
      md: 768,
      lg: 1024,
      xl: 1366,
    },
  },
});

export default theme;
