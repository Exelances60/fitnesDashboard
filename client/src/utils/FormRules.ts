import { Rule } from "antd/es/form";

export const emailRules: Rule[] = [{ type: "email" }, { required: true }];

export const justRequired: Rule[] = [{ required: true }];
