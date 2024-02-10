export const currencyFormatter = (number: number) => {
  return Intl.NumberFormat("tr").format(number).toString() + "TL";
};
