export const currencyFormatter = (number: number) => {
  return Intl.NumberFormat("tr").format(number).toString() + "TL";
};

export const capitalizeFirstLetter = (str: string) => {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
};
