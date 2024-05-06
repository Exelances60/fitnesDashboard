import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Button } from "antd";
import { useRouter } from "next/navigation";

interface IRegisterApplicationProps {
  current: string;
  inputRef: React.RefObject<HTMLInputElement>;
  divRef: React.RefObject<HTMLDivElement>;
}

const RegisterApplication = forwardRef<
  HTMLDivElement,
  IRegisterApplicationProps
>(({ current, inputRef, divRef }, ref) => {
  const router = useRouter();

  const applicationFormFinish = () => {
    router.push(`/register/${inputRef.current?.value}`);
  };

  return (
    <>
      {current === "Application" && (
        <div ref={divRef}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: current === "Application" ? 1 : 0,
              x: current === "Application" ? 0 : 100,
            }}
            className="flex flex-col items-center justify-center gap-2 w-full"
          >
            <input
              placeholder="Enter your application ID"
              name="application"
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              ref={inputRef}
            />
            <Button
              type="primary"
              className="w-full"
              onClick={applicationFormFinish}
            >
              Check Application
            </Button>
          </motion.div>
        </div>
      )}
    </>
  );
});

RegisterApplication.displayName = "RegisterApplication";
export default RegisterApplication;
