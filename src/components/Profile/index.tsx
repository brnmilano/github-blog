import { Box, Typography } from "@mui/material";
import { useRequests } from "../../hooks/useRequests";
import styles from "./styles.module.scss";
import GitHubIcon from "../Icons/GitHubIcon";
import CompanyIcon from "../Icons/CompanyIcon";
import FollowersIcon from "../Icons/FollowersIcon";
import LinkIcon from "../Icons/LinkIcon";

/**
 * Componente Profile: Renderiza o perfil do usuário.
 *
 * Este componente é responsável por exibir as informações do perfil de um usuário.
 */
export default function Profile() {
  const { user } = useRequests();

  const userInfo = [
    { icon: <GitHubIcon />, text: user.login },
    { icon: <CompanyIcon />, text: user.company ?? "Sem empresa atualmente" },
    { icon: <FollowersIcon />, text: `${user.followers} seguidores` },
  ];

  return (
    <Box className={styles.container}>
      <Box
        sx={{ backgroundColor: "#0B1B2B", borderRadius: "10px" }}
        display="flex"
        gap="32px"
        p={5}
      >
        <img src={user.avatar_url} />

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="column" gap="15px">
            <Box display="flex" justifyContent="space-between">
              <Typography
                variant="h1"
                color="#E7EDF4"
                fontSize={24}
                fontWeight="bold"
              >
                {user.name}
              </Typography>

              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                Github
                <LinkIcon />
              </a>
            </Box>

            <Typography
              variant="caption"
              color="#A2B8CD"
              fontSize={16}
              fontWeight="regular"
            >
              {user.bio}
            </Typography>
          </Box>

          <Box display="flex" gap="32px">
            {userInfo.map((item, index) => (
              <Typography
                key={index}
                variant="caption"
                color="#A2B8CD"
                fontSize={16}
                fontWeight="regular"
              >
                {item.icon}
                {item.text}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
