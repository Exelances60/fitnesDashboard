import React, { forwardRef } from "react";
import { emailRules, justRequired } from "@/utils/FormRules";
import { Form, Input } from "antd";
import { motion } from "framer-motion";

interface IRegisterAccountStepsProps {
  current: string;
}

const RegisterAccountSteps = forwardRef<
  HTMLDivElement,
  IRegisterAccountStepsProps
>(({ current }, ref) => {
  return (
    <>
      {current === "Account" && (
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Form.Item name="email" label="Email" rules={[...emailRules]}>
              <Input placeholder="Enter The Email" />
            </Form.Item>
            <Form.Item
              name="password"
              required
              label="Password"
              rules={[...justRequired, { min: 6 }]}
            >
              <Input.Password placeholder="Enter The Password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[...justRequired, { min: 6 }]}
            >
              <Input type="password" placeholder="Enter The Confirm Password" />
            </Form.Item>
          </motion.div>
        </div>
      )}
    </>
  );
});

RegisterAccountSteps.displayName = "RegisterAccountSteps";

export default RegisterAccountSteps;
