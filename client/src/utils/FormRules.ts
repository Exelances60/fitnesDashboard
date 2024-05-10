import { Rule } from "antd/es/form";

export const justRequired: Rule[] = [
  { required: true, message: "This field is required" },
];

export const emailRules: Rule[] = [
  { type: "email", message: "The input is not valid E-mail!" },
  ...justRequired,
];

export const productDescriptionRules: Rule[] = [
  ...justRequired,
  { min: 10, message: "Description or too short" },
];

export const minFive: Rule[] = [
  { min: 5, message: "is required or too short min 5 words" },
];

export const maxBodyWeight: Rule[] = [
  {
    validator: (rule, value, callback) => {
      if (value > 350) {
        callback("Please enter a valid weight max 350 kg");
      } else {
        callback();
      }
    },
  },
];
export const maxHeight: Rule[] = [
  {
    validator: (rule, value, callback) => {
      if (value > 250) {
        callback("Please enter a valid height max 250 cm");
      } else {
        callback();
      }
    },
  },
];

export const maxAge: Rule[] = [
  {
    validator: (rule, value, callback) => {
      if (value > 80) {
        callback("Please enter a valid age max 80");
      } else {
        callback();
      }
    },
  },
];

export const maxPrice: Rule[] = [
  {
    validator: (rule, value, callback) => {
      if (value > 100000) {
        callback("Please enter a valid price max 100000");
      } else {
        callback();
      }
    },
  },
];

export const minAmount: Rule[] = [
  {
    validator: (rule, value, callback) => {
      if (value < 1) {
        callback("Please enter a valid amount min 1");
      } else {
        callback();
      }
    },
  },
];

export const phoneRules: Rule[] = [
  ...justRequired,
  { min: 10, message: "Min 10 characters" },
  { max: 10, message: "Max 10 characters" },
];

export const employeeMinAge: Rule[] = [
  {
    validator: (rule, value, callback) => {
      if (value < 18) {
        callback("Employee must be older than 18");
      } else {
        callback();
      }
    },
  },
];
