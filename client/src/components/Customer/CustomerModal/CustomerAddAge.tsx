import React, { useState } from "react";
import * as Icon from "@ant-design/icons";
import { Form, Input, InputNumber } from "antd";
import useDebounce from "@/hooks/useDebounce";
import { renderFormItem } from "@/utils/renderForTables/Customers/renderCustomerFormItem";
import { motion } from "framer-motion";

const CustomerAddAge = () => {
  const [age, setAge] = useState<number | null>(null);
  const debounceAge = useDebounce(age, 200);

  return (
    <>
      <div className="flex gap-4">
        {renderFormItem(
          "Email",
          "email",
          "Enter Email",
          "email",
          <Icon.MailOutlined />
        )}
        <Form.Item
          label="Age"
          name="age"
          className="w-full"
          rules={[
            {
              required: true,
              message: "Age is required",
            },
          ]}
        >
          <InputNumber
            type="number"
            placeholder="Enter Age"
            onChange={(value) => setAge(value as number)}
            className="w-full"
            addonBefore={<Icon.UserOutlined />}
          />
        </Form.Item>
      </div>
      {debounceAge && (debounceAge as number) < 18 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Form.Item
            label="Parent Phone"
            name="parentPhone"
            rules={[
              {
                required: true,
                message: "Parent Phone is required",
              },
            ]}
          >
            <Input
              placeholder="Enter Parent Phone"
              type="tel"
              addonBefore="+90"
            />
          </Form.Item>
        </motion.div>
      ) : null}
    </>
  );
};

export default CustomerAddAge;
