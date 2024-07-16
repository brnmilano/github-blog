/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Transforma a primeira letra de uma string em maiúscula.
 *
 * - Esta função recebe uma string como entrada.
 * - Primeiro, verifica se o valor é false (por exemplo, "", null, undefined, 0, false), e em caso afirmativo, retorna uma string vazia.
 *
 * Se o valor for true, a função prossegue para formatar o valor:
 * - Converte o valor para minúsculas, para garantir consistência.
 * - Substitui qualquer underline ("_") por um espaço, para melhorar a legibilidade.
 *
 * Após a formatação, a função pega a primeira letra da string resultante,
 * converte-a para maiúscula e a concatena com o restante da string, começando do segundo caractere.
 *
 * @param value O valor a ser formatado.
 * @returns Uma nova string com a primeira letra em maiúscula e underlines substituídos por espaços. Se o valor de entrada for false, retorna uma string vazia.
 */
export const capitalFirstLetter = (value: string) => {
  if (!value) {
    return "";
  }

  const valueFormatted = value.toLowerCase().replace("_", " ");

  const newValue =
    valueFormatted.toString()[0].toUpperCase() + valueFormatted.substring(1);
  return newValue;
};

/**
 * Calcula o tempo relativo de uma data até o momento atual.
 *
 * @param date A data de entrada como string. Deve ser uma data válida que possa ser convertida por `new Date()`.
 * @returns Uma string descrevendo quanto tempo passou desde a data até agora. Se a data for inválida, retorna "Data inválida".
 *          Retorna "agora mesmo" se a diferença for menor que um segundo.
 */
export const getRelativeTime = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (isNaN(past.getTime())) {
    return "Data inválida";
  }

  const units = [
    { label: "ano", seconds: 31536000 },
    { label: "mês", seconds: 2592000 },
    { label: "dia", seconds: 86400 },
    { label: "hora", seconds: 3600 },
    { label: "minuto", seconds: 60 },
    { label: "segundo", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);

    if (interval >= 1) {
      return `há ${interval} ${unit.label}${interval > 1 ? "s" : ""}`;
    }
  }

  return "agora mesmo";
};
