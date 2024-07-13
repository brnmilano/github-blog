import { Box, Typography } from "@mui/material";
import { Input } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { useRequests } from "../../hooks/useRequests";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import CardBasic from "../../components/Card";
import Profile from "../../components/Profile";
import styles from "./styles.module.scss";

interface SearchProps {
  searchContent?: string;
}

export default function Blog() {
  const navigate = useNavigate();

  const { posts } = useRequests();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const watchSearchContent = watch("searchContent");

  const handleSearchPosts = (data: SearchProps) => {
    console.log({ watchSearchContent, data });
  };

  const handleViewPost = (id: number) => {
    navigate(`/post/${id}`);
  };

  return (
    <Container>
      <Profile />

      <Box paddingY={5} marginTop={22}>
        <Box paddingBottom={6}>
          <form
            className={styles.formWrapper}
            onSubmit={handleSubmit(handleSearchPosts)}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                variant="h2"
                fontSize={20}
                color="#E7EDF4"
                fontWeight="bold"
              >
                Publicações
              </Typography>

              <Typography
                variant="caption"
                fontSize={14}
                display="block"
                color="#7B96B2"
                fontWeight="regular"
              >
                {posts.length} publicações
              </Typography>
            </Box>

            <Input
              control={control}
              errors={errors}
              placeholder="Buscar conteúdo"
              registerField="searchContent"
            />
          </form>
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="32px">
          {posts.map((card, index) => {
            return (
              <CardBasic
                key={index}
                number={card.number}
                title={card.title}
                content={card.body}
                date={card.created_at}
                handleClick={() => {
                  handleViewPost(card.number);
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}
