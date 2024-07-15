/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CircularProgress, Skeleton, Typography } from "@mui/material";
import { useRequests } from "../../hooks/useRequests";
import { blogPath } from "../../constants/paths";
import { getRelativeTime } from "../../utils";
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
      text: formattedDate,
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
          className={styles.postInfoWrapper}
          sx={{ backgroundColor: "#0B1B2B" }}
          display="flex"
          flexDirection="column"
          p={5}
          borderRadius="10px"
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

              <Box display="flex" gap="32px" marginTop="15px">
                {postDetailInfo.map((item, index) => (
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
            </>
          )}
        </Box>

        <Box
          marginTop={20}
          paddingInline={5}
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
