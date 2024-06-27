import React, { forwardRef } from "react";
import { emailRules, justRequired } from "@/utils/FormRules";
import { Form, Input } from "antd";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface IRegisterAccountStepsProps {
  current: string;
}

const RegisterAccountSteps = forwardRef<
  HTMLDivElement,
  IRegisterAccountStepsProps
>(({ current }, ref) => {
  const t = useTranslations("RegisterStepsPage");
  return (
    <>
      <div ref={ref}>
        <motion.div
          initial={{
            opacity: 0,
            x: 100,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className={
            current === "Account" || current === "Hesap" ? "block" : "hidden"
          }
        >
          <Form.Item name="email" label={t("email")} rules={[...emailRules]}>
            <Input placeholder="Enter The Email" />
          </Form.Item>
          <Form.Item
            name="password"
            required
            label={t("password")}
            rules={[...justRequired, { min: 6 }]}
          >
            <Input.Password placeholder="Enter The Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={t("confirmPassword")}
            rules={[...justRequired, { min: 6 }]}
          >
            <Input type="password" placeholder={t("confirmPassword")} />
          </Form.Item>
        </motion.div>
      </div>
    </>
  );
});

RegisterAccountSteps.displayName = "RegisterAccountSteps";

export default RegisterAccountSteps;
