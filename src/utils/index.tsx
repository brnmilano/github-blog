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
