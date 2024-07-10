import { Box, Typography } from "@mui/material";
import { Input } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Container from "../../components/Container/Container";
import CardBasic from "../../components/Card";
import Profile from "../../components/Profile";
import { api } from "../../services/service";

export default function Blog() {
  const cardFakeData = [
    {
      title: "JavaScript data types and data structures",
      content:
        "Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages aredrawn.",
      date: new Date().toLocaleDateString(),
    },
    {
      title: "JavaScript data types and data structures",
      content:
        "Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages aredrawn.",
      date: new Date().toLocaleDateString(),
    },
    {
      title: "JavaScript data types and data structures",
      content:
        "Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages aredrawn.",
      date: new Date().toLocaleDateString(),
    },
    {
      title: "JavaScript data types and data structures",
      content:
        "Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages aredrawn.",
      date: new Date().toLocaleDateString(),
    },
  ];

  const {
    control,
    formState: { errors },
  } = useForm({});

  const onLoadScreen = async () => {
    await api
      .get(`/search/issues?q=Dynamic%20typing%20repo:daltonmenezes/test`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onLoadScreen();
  }, []);

  return (
    <Container>
      <Profile />

      <Box paddingY={5} marginTop={22}>
        <Box paddingBottom={6} display="flex" flexDirection="column" gap="20px">
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
              6 publicações
            </Typography>
          </Box>

          <Input
            control={control}
            errors={errors}
            placeholder="Buscar conteúdo"
            registerField="searchContent"
          />
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="32px">
          {cardFakeData.map((card, index) => {
            return (
              <CardBasic
                key={index}
                title={card.title}
                content={card.content}
                date={card.date}
              />
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}
