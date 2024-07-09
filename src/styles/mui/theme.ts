import { createTheme } from "@mui/material/styles";

//fontFamily
const font_family = "Nunito";

const theme = createTheme({
  typography: {
    fontFamily: [font_family, "sans-serif"].join(","),
  },
});

export default theme;
