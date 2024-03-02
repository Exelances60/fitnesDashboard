import { Rule } from "antd/es/form";

export const emailRules: Rule[] = [{ type: "email" }, { required: true }];

export const justRequired: Rule[] = [{ required: true }];

export const productDescriptionRules: Rule[] = [
  { required: true },
  { min: 10, message: "Description or too short" },
];

export const minFive: Rule[] = [
  { min: 5, message: "is required or too short min 5 words" },
];
