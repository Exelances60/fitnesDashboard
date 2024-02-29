import React from "react";
import { motion } from "framer-motion";
import { ColorPickerProps, Form, GetProp, Input, Select } from "antd";
import { ColorPicker } from "antd";

type Color = GetProp<ColorPickerProps, "value">;

interface CustomerDetailsStaticFormProps {
  handleAddPlan: (values: {
    planType: string;
    planText: string;
    color: Color;
  }) => void;
  setSelectedPlan: (value: string) => void;
  selectedPlan: string;
}

const CustomerDetailsStaticForm = ({
  handleAddPlan,
  setSelectedPlan,
  selectedPlan,
}: CustomerDetailsStaticFormProps) => {
  return (
    <>
      <Form layout="vertical" onFinish={handleAddPlan} id="addActivity">
        <Form.Item
          label="Select Plan"
          name="planType"
          rules={[{ required: true, message: "Please select plan" }]}
        >
          <Select
            className="w-full"
            placeholder="Select Plan"
            onChange={(value) => {
              setSelectedPlan(value);
            }}
          >
            <Select.Option value="bodyInfo">Body Info</Select.Option>
            <Select.Option value="exercises">Exercises Info</Select.Option>
            <Select.Option value="nutrition">Nutrition Info</Select.Option>
            <Select.Option value="progress">Progress Info</Select.Option>
          </Select>
        </Form.Item>

        {selectedPlan ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div>
              <Form.Item
                label="Add Plan"
                name="planText"
                rules={[{ required: true, message: "Please add plan" }]}
              >
                <Input.TextArea
                  className="mt-2 "
                  placeholder="Add Plan"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            </div>

            <Form.Item
              label="Select Color"
              name="color"
              initialValue={"#6b41ec"}
              rules={[{ required: true, message: "Please select color" }]}
            >
              <ColorPicker className="mt-2" format="hex" />
            </Form.Item>
          </motion.div>
        ) : null}
      </Form>
    </>
  );
};

export default CustomerDetailsStaticForm;
