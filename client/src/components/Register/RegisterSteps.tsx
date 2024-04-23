"use client";
import { Button, Form, Segmented, Tooltip, Tour } from "antd";
import React, { useRef, useState } from "react";
import RegisterAccountSteps from "./RegisterAccountSteps";
import RegisterProfileSteps from "./RegisterProfileSteps";
import { motion } from "framer-motion";
import { QuestionOutlined } from "@ant-design/icons";
import { TourProps } from "antd/lib";

const RegisterSteps = () => {
  const accountRef = useRef(null);
  const profileRef = useRef(null);
  const finishRef = useRef(null);
  const [current, setCurrent] = useState("Account");
  const [open, setOpen] = useState(false);

  const steps: TourProps["steps"] = [
    {
      title: "Welcome to Account Registration",
      target: () => accountRef.current,
      description:
        "This tab account email and password information and move to the next step",
      cover: "This is your account information",
    },
    {
      title: "Profile Information",
      target: () => profileRef.current,
      description:
        "This tab basic profile information for your account and move to the next step",
      cover: "This is your profile information",
    },
    {
      title: "Finish",
      target: () => finishRef.current,
      description:
        "This tab is the final step to finish the registration process and you must see the qr code and using qr code your tracking the registration process",
      cover: "You are all set",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <Segmented
        size="large"
        value={current}
        options={["Account", "Profile", "Finish"]}
        onChange={(value) => {
          setCurrent(value);
        }}
      />
      <Tooltip title="Guide" placement="bottomRight">
        <QuestionOutlined
          className="text-2xl font-bold absolute top-0 p-2 left-0"
          onClick={() => {
            setCurrent("Account");
            setOpen(true);
          }}
        />
      </Tooltip>
      <Form
        layout="vertical"
        className="w-full"
        onFinish={(values) => {
          console.log(values);
        }}
      >
        {current === "Account" ? (
          <RegisterAccountSteps current={current} ref={accountRef} />
        ) : null}
        {current === "Profile" ? (
          <RegisterProfileSteps current={current} ref={profileRef} />
        ) : null}
        {current === "Finish" ? (
          <div ref={finishRef}>
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
              <Button type="primary" htmlType="submit" className="w-full">
                Finish
              </Button>
            </motion.div>
          </div>
        ) : null}
        <Tour
          open={open}
          onClose={() => setOpen(false)}
          steps={steps}
          onChange={(index) => {
            if (index === 0) {
              setCurrent("Account");
            } else if (index === 1) {
              setCurrent("Profile");
            } else if (index === 2) {
              setCurrent("Finish");
            }
          }}
        />
      </Form>
    </div>
  );
};

export default RegisterSteps;
