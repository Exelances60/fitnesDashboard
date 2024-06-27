import React from "react";
import { justRequired, phoneRules } from "@/utils/FormRules";
import { Form, Input, Upload } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
const { Dragger } = Upload;

interface IRegisterProfileStepsProps {
  current: string;
  ref: React.RefObject<HTMLDivElement>;
}

const RegisterProfileSteps = React.forwardRef<
  HTMLDivElement,
  IRegisterProfileStepsProps
>(({ current }, ref) => {
  const t = useTranslations("RegisterStepsPage");
  return (
    <>
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className={
            current === "Profile" || current === "Profil" ? "block" : "hidden"
          }
        >
          <div className="w-full flex justify-center items-center">
            <Form.Item
              name="ownerImage"
              className="w-full h-full  border-gray-300 rounded-lg"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
            >
              <Dragger
                name="file"
                multiple={false}
                maxCount={1}
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <CloudUploadOutlined
                    className="text-4xl"
                    twoToneColor="#1890ff"
                  />
                  <p className="text-sm text-gray-500">
                    {t("uploadCompanyLogo")}
                  </p>
                </div>
              </Dragger>
            </Form.Item>
          </div>
          <Form.Item
            name="companyName"
            label={t("companyName")}
            rules={[...justRequired]}
          >
            <Input placeholder={t("enterCompanyName")} />
          </Form.Item>
          <Form.Item
            name="address"
            label={t("address")}
            rules={[...justRequired]}
          >
            <Input placeholder={t("enterAddress")} />
          </Form.Item>
          <Form.Item name="phone" label={t("phone")} rules={[...phoneRules]}>
            <Input placeholder={t("enterPhone")} />
          </Form.Item>
        </motion.div>
      </div>
    </>
  );
});

RegisterProfileSteps.displayName = "RegisterAccountSteps";

export default RegisterProfileSteps;
