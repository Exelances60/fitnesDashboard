import React, { ReactNode } from "react";
import { Form, Input } from "antd";

export const renderFormItem = (
  label: string,
  name: string,
  placeholder: string,
  type: string,
  addonBefore: ReactNode | string | null
) => (
  <Form.Item
    label={label}
    name={name}
    className="w-full"
    rules={[
      { required: true, message: `${label} is required or too short` },
      { min: 1, message: `${label} is required or too short` },
    ]}
  >
    <Input placeholder={placeholder} type={type} addonBefore={addonBefore} />
  </Form.Item>
);
