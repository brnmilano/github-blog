import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import clsx from "clsx";
import styles from "./styles.module.scss";

type Props = {
  className?: string;
};

/**
 * Componente Container para encapsular conteúdo com estilos customizáveis.
 *
 * @param props - Contém `children` para o conteúdo interno e `className` para estilos adicionais.
 * @returns Elemento `div` com classes combinadas para estilização.
 */
export default function Container({
  children,
  className,
}: PropsWithChildren<Props>): JSX.Element {
  return (
    <Box
      width="100%"
      maxWidth={1250}
      margin="0 auto"
      position="relative"
      className={clsx(styles.container, className)}
    >
      {children}
    </Box>
  );
}
