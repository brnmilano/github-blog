import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Logo from "../../../public/logo.png";

export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box>
      {isMobile ? (
        <></>
      ) : (
        <>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "100%",
            }}
          />
        </>
      )}
    </Box>
  );
}
