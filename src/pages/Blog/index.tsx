import { Box } from "@mui/material";
import Container from "../../components/Container/Container";
import { Input } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import CardBasic from "../../components/Card";

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

  return (
    <Container>
      {/* <Box paddingY={5}>
        <Box paddingBottom={6}>
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
      </Box> */}
    </Container>
  );
}
