/* eslint-disable @typescript-eslint/no-explicit-any */
export const capitalFirstLetter = (value: any) => {
  if (!value) {
    return "";
  }

  const valueFormatted = value.toLowerCase().replace("_", " ");
  const newValue =
    valueFormatted.toString()[0].toUpperCase() + valueFormatted.substring(1);
  return newValue;
};

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
