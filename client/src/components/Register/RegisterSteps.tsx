"use client";
import { Form, message, Segmented, Spin, Tooltip, Tour } from "antd";
import React, { useRef, useState } from "react";
import RegisterAccountSteps from "./RegisterAccountSteps";
import RegisterProfileSteps from "./RegisterProfileSteps";
import { QuestionOutlined } from "@ant-design/icons";
import { TourProps } from "antd/lib";
import axiosClient from "@/utils/AxiosClient";
import RegisterApplication from "./RegisterApplication";
import RegisterFinishSteps from "./RegisterFinishSteps";
import { useRouter } from "next/navigation";

interface IFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  ownerImage: any;
  companyName: string;
  address: string;
  phone: string;
}

const RegisterSteps = () => {
  const accountRef = useRef(null);
  const profileRef = useRef(null);
  const finishRef = useRef(null);
  const applicationRef = useRef(null);
  const applicationInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [current, setCurrent] = useState("Account");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const steps: TourProps["steps"] = [
    {
      title: "Welcome to Account Registration",
      target: () => accountRef.current,
      description:
        "This tab account email and password information and move to the next step",
    },
    {
      title: "Profile Information",
      target: () => profileRef.current,
      description:
        "This tab basic profile information for your account and move to the next step",
    },
    {
      title: "Finish",
      target: () => finishRef.current,
      description:
        "This tab is the final step to finish the registration process and you must see the qr code and using qr code your tracking the registration process",
    },
    {
      title: "Application",
      target: () => applicationRef.current,
      description:
        "This tab is for checking the application status using the application ID",
    },
  ];

  const onFinish = async (values: IFormValues) => {
    setLoading(true);
    if (values.password !== values.confirmPassword) {
      return message.error({
        content: "Password does not match",
        key: "register",
      });
    }
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (values.ownerImage) {
        formData.append("ownerImage", values.ownerImage[0].originFileObj);
      }
      formData.append("companyName", values.companyName);
      formData.append("address", values.address);
      formData.append("phone", values.phone);
      const response = await axiosClient.postForm("/auth/signup", formData);
      message.success({
        content: response.data.message,
        key: "register",
      });
      router.push("/");
    } catch (error: any) {
      message.error({
        content: error.response.data.errorMessage,
        key: "register",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Spin spinning={loading} fullscreen />
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <Segmented
          size="large"
          value={current}
          options={["Account", "Profile", "Finish", "Application"]}
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
          form={form}
          layout="vertical"
          className="w-full"
          onFinish={onFinish}
          name="register"
        >
          <RegisterAccountSteps current={current} ref={accountRef} />

          <RegisterProfileSteps current={current} ref={profileRef} />

          <RegisterFinishSteps current={current} ref={finishRef} />

          <RegisterApplication
            current={current}
            inputRef={applicationInputRef}
            divRef={applicationRef}
          />

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
              } else if (index === 3) {
                setCurrent("Application");
              }
            }}
          />
        </Form>
      </div>
    </>
  );
};

export default RegisterSteps;
