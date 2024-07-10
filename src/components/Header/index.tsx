import { Box } from "@mui/material";
import Logo from "../../../public/headerLogo.png";

export default function Header() {
  return (
    <Box>
      <img
        src={Logo}
        alt="Logo"
        style={{
          width: "100%",
        }}
      />
    </Box>
  );
}
