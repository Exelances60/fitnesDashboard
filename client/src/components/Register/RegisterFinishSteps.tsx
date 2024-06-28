import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Button } from "antd";
import RegisterWaitPhoto from "@/../public/undraw_wait_in_line_o2aq.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface IRegisterFinishStepsProps {
  current: string;
  ref: React.RefObject<HTMLDivElement>;
}

const RegisterFinishSteps = forwardRef<
  HTMLDivElement,
  IRegisterFinishStepsProps
>(({ current }, ref) => {
  const t = useTranslations("RegisterStepsPage");

  return (
    <>
      {(current === "Finish" || current === "Bitir") && (
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: current === "Finish" || current === "Bitir" ? 1 : 0,
              x: current === "Finish" || current === "Bitir" ? 0 : 100,
            }}
            className="flex flex-col items-center justify-center gap-2 w-full"
          >
            <Image
              src={RegisterWaitPhoto}
              alt="placeholder"
              width={300}
              height={300}
              className="my-2"
            />
            <p>{t("thankYouForRegister")} </p>
            <p>{t("accountUnderReview")} </p>
            <p>{t("weWillContactYou")}</p>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              form="register"
            >
              {t("finish")}
            </Button>
          </motion.div>
        </div>
      )}
    </>
  );
});

RegisterFinishSteps.displayName = "RegisterFinishSteps";
export default RegisterFinishSteps;
