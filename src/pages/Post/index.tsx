/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CircularProgress, Skeleton, Typography } from "@mui/material";
import { useRequests } from "../../hooks/useRequests";
import { blogPath } from "../../constants/paths";
import { capitalFirstLetter, getRelativeTime } from "../../utils";
import Container from "../../components/Container/Container";
import styles from "./styles.module.scss";
import LinkIcon from "../../components/Icons/LinkIcon";
import BackArrowIcon from "../../components/Icons/BackArrowIcon";
import GitHubIcon from "../../components/Icons/GitHubIcon";
import CalendarIcon from "../../components/Icons/CalendarIcon";
import CommentsIcon from "../../components/Icons/CommentsIcon";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Post() {
  const param = useParams();

  const { postDetails, getPostDetails, loading } = useRequests();

  const formattedDate = getRelativeTime(postDetails.created_at);

  const postDetailInfo = [
    { icon: <GitHubIcon />, text: postDetails.login },
    {
      icon: <CalendarIcon />,
      text: capitalFirstLetter(formattedDate),
    },
    { icon: <CommentsIcon />, text: `${postDetails.comments} comentários` },
  ];

  const onLoadScreen = () => {
    const postId = Number(param.postId);

    getPostDetails(postId);
  };

  useEffect(() => {
    onLoadScreen();
  }, []);

  return (
    <Container>
      <Box className={styles.container}>
        <Box
          sx={{ backgroundColor: "#0B1B2B" }}
          display="flex"
          flexDirection="column"
          borderRadius="10px"
          position="relative"
          p={{
            xs: 2,
            sm: 3,
            md: 5,
          }}
          marginTop={{
            xs: "30px",
            md: "-60px",
            lg: "-80px",
          }}
        >
          {loading ? (
            <Box display="flex" flexDirection="column" gap="12px">
              <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height={20}
              />

              <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height={50}
              />

              <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height={20}
              />
            </Box>
          ) : (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                marginBottom="30px"
              >
                <Link to={blogPath}>
                  <BackArrowIcon />
                  Voltar
                </Link>

                <a
                  href={postDetails.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no Github
                  <LinkIcon />
                </a>
              </Box>

              <Typography
                variant="h1"
                color="#E7EDF4"
                fontSize={24}
                fontWeight="bold"
              >
                {postDetails.title}
              </Typography>

              <Box
                display={{
                  xs: "block",
                  md: "flex",
                }}
                marginTop={{
                  xs: "25px",
                  md: "10px",
                }}
                gap="32px"
              >
                {postDetailInfo.map((item, index) => (
                  <Typography
                    key={index}
                    variant="caption"
                    color="#A2B8CD"
                    fontSize={16}
                    fontWeight="regular"
                    marginBottom={{
                      xs: "15px",
                      md: 0,
                    }}
                    sx={{
                      "&:last-child": {
                        marginBottom: 0,
                      },
                    }}
                  >
                    {item.icon}
                    {item.text}
                  </Typography>
                ))}
              </Box>
            </>
          )}
        </Box>

        <Box
          marginTop={{
            xs: 4,
            sm: 6,
            md: 8,
          }}
          paddingInline={{
            xs: 0,
            sm: 3,
            md: 5,
          }}
          className={styles.markdownContent}
        >
          {loading ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {postDetails.body}
              </ReactMarkdown>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
