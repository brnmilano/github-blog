import { CardContent, Typography, Card, Box } from "@mui/material";
import { capitalFirstLetter, getRelativeTime } from "../../utils";

interface CardProps {
  number: number;
  title: string;
  content: string;
  date: string;
  handleClick: (id: number) => void;
}

/**
 * Componente CardBasic: Exibe um Card com as informações de um Issue.
 *
 * Este componente recebe `props` do tipo `CardProps`, que devem incluir todas as informações
 * necessárias para renderizar o Card com as informações do Issue. O componente é projetado para ser reutilizável,
 * permitindo a exibição de diferentes Issues conforme os dados passados através das `props`.
 *
 * @param props - Objeto contendo as propriedades necessárias para renderizar o Card com as informações do Issue.
 *                Deve seguir a estrutura definida por `CardProps`.
 * @returns Retorna o JSX do componente CardBasic, renderizando as informações do Issue conforme especificado nas `props`.
 */
export default function CardBasic(props: CardProps) {
  const { title, content, date, number, handleClick } = props;

  //const formattedContent = RemoveMarkdown(content);

  const formattedDate = getRelativeTime(date);

  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: "#112131",
        borderRadius: "10px",
        border: "2px solid #112131",
        transition: "border 0.2s",
        cursor: "pointer",
        "&:hover": { border: "2px solid #3a536b" },
      }}
      onClick={() => handleClick(number)}
    >
      <CardContent>
        <Box
          alignItems="flex-start"
          justifyContent="space-between"
          marginBottom={4}
          display={{
            xs: "block",
            md: "flex",
          }}
        >
          <Typography
            variant="h2"
            fontSize={20}
            color="#E7EDF4"
            fontWeight="bold"
            lineHeight="30px"
            maxWidth={{
              md: "250px",
              lg: "300px",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="caption"
            fontSize={14}
            display="block"
            color="#7B96B2"
          >
            {capitalFirstLetter(formattedDate)}
          </Typography>
        </Box>

        <Typography
          component="p"
          fontSize={16}
          color="#AFC2D4"
          lineHeight="25px"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
