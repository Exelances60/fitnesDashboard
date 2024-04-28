import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Button } from "antd";

interface IRegisterFinishStepsProps {
  current: string;
  ref: React.RefObject<HTMLDivElement>;
}

const RegisterFinishSteps = forwardRef<
  HTMLDivElement,
  IRegisterFinishStepsProps
>(({ current }, ref) => {
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{
          opacity: current === "Finish" ? 1 : 0,
          x: current === "Finish" ? 0 : 100,
        }}
        className="flex flex-col items-center justify-center gap-2 w-full"
      >
        <p> Thank you for registering </p>
        <p>Your account is under review 🔍 </p>
        <p> We will send you an email or SMS to in 2 days ⌚</p>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          form="register"
        >
          Finish
        </Button>
      </motion.div>
    </div>
  );
});

RegisterFinishSteps.displayName = "RegisterFinishSteps";
export default RegisterFinishSteps;
