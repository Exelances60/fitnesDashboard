import React, { useState } from "react";
import * as Icon from "@ant-design/icons";
import { Form, Input, InputNumber } from "antd";
import useDebounce from "@/hooks/useDebounce";
import { motion } from "framer-motion";
import { justRequired, maxAge } from "@/utils/FormRules";

const CustomerAddAge = () => {
  const [age, setAge] = useState<number | null>(null);
  const debounceAge = useDebounce(age, 200);

  return (
    <>
      <div className="flex gap-4">
        <Form.Item
          label="Email"
          name="email"
          className="w-full"
          rules={[...justRequired, { type: "email" }]}
        >
          <Input
            placeholder="Enter Email"
            type="email"
            addonBefore={<Icon.MailOutlined />}
          />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          className="w-full"
          rules={[...justRequired, ...maxAge]}
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
            rules={[...justRequired]}
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
