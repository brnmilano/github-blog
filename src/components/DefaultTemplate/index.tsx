import { Box } from "@mui/material";
import Header from "../Header";

export default function DefaultTemplate({ children }: React.PropsWithChildren) {
  return (
    <>
      <Box>
        <Header />
      </Box>

      <Box>{children}</Box>
    </>
  );
}
