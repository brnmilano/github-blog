import { CardContent, Typography, Card, Box } from "@mui/material";

interface CardProps {
  title: string;
  content: string;
  date: string;
}

export default function CardBasic(props: CardProps) {
  const { title, content, date } = props;

  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: "#112131",
        borderRadius: "10px",
        border: "2px solid #112131",
        transition: "border 0.2s",
        cursor: "text",
        "&:hover": { border: "2px solid #3a536b" },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          marginBottom={4}
        >
          <Typography
            variant="h2"
            fontSize={20}
            color="#E7EDF4"
            fontWeight="bold"
            maxWidth="300px"
            lineHeight="30px"
          >
            {title}
          </Typography>

          <Typography
            variant="caption"
            fontSize={14}
            display="block"
            color="#7B96B2"
            fontWeight="regular"
          >
            {date}
          </Typography>
        </Box>

        <Typography
          component="p"
          fontWeight="regular"
          fontSize={16}
          color="#AFC2D4"
          lineHeight="25px"
        >
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
