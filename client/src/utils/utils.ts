type MoneyType =
  | "USD"
  | "EUR"
  | "GBP"
  | "JPY"
  | "CNY"
  | "RUB"
  | "KRW"
  | "INR"
  | "BRL"
  | "CAD"
  | "AUD"
  | "MXN"
  | "IDR"
  | "TRY"
  | "ZAR"
  | "HKD"
  | "PHP"
  | "SGD"
  | "NOK"
  | "SEK"
  | "DKK"
  | "CHF"
  | "CZK"
  | "PLN"
  | "HUF"
  | "RON"
  | "HRK"
  | "BGN"
  | "NZD"
  | "THB"
  | "MYR";

export const currencyFormatter = (number: number, type: MoneyType) => {
  return Intl.NumberFormat("default", {
    style: "currency",
    currency: type,
  }).format(number);
};

export const capitalizeFirstLetter = (str: string) => {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
};

export const formDisableAnimation = {
  hidden: {
    opacity: 0.5,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
