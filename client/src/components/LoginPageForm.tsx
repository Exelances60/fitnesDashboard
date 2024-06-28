"use client";
import React, { useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import axiosClient from "@/utils/AxiosClient";
import { jwtDecode } from "jwt-decode";
import { emailRules } from "@/utils/FormRules";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

const LoginPageForm = () => {
  const t = useTranslations("AuthPages");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const calculateMaxAge = (expirationTime: number) => {
    const currentTime = new Date().getTime();
    const maxAgeInSeconds = Math.floor((expirationTime - currentTime) / 1000);
    return maxAgeInSeconds;
  };

  const handleSuccess = (data: any) => {
    const user = jwtDecode(data.token) as jwtUserDecode;
    const maxAgeInSeconds = calculateMaxAge(user.exp * 1000);
    setCookie("token", data.token, {
      maxAge: maxAgeInSeconds,
      secure: process.env.NODE_ENV === "production",
    });
    setError("");
    message.destroy("login");
    message.success(t("loginSuccess"));
    const nextUrl = searchParams.get("next");
    router.push(nextUrl ? nextUrl : "/dashboard");
  };

  const onFinish = async (values: { email: string; password: string }) => {
    message.loading({ content: t("loading"), key: "login" });
    setLoading(true);
    try {
      const { data, status } = await axiosClient.post("/auth/login", values);
      if (status === 200) {
        handleSuccess(data);
      }
    } catch (error: any) {
      message.destroy("login");
      message.error(error.response?.data.errorMessage || t("wrong"));

      setError(error.response?.data.errorMessage || t("wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Spin spinning={loading}>
        <Form
          className="flex flex-col gap-[10px] justify-center w-full"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item name="email" rules={emailRules} label={t("email")}>
            <Input
              type="text"
              placeholder={t("email")}
              value={""}
              className="w-full h-[50px] px-[10px] bg-[#F0F2F5] rounded-[10px]"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please Input your Password!" }]}
            label={t("password")}
          >
            <Input.Password
              type="password"
              placeholder={t("password")}
              value={""}
              className="w-full h-[50px] px-[10px] bg-[#F0F2F5] rounded-[10px]"
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            loading={loading}
            className="w-full h-[50px] bg-[#4880FF] rounded-[10px] text-white font-bold"
          >
            {t("login")}
          </Button>
          <Link href="/register" className="text-center text-[#4880FF]">
            {t("register")}
          </Link>
          {error ? <p className="text-red-500">{error}</p> : null}
        </Form>
      </Spin>
    </motion.div>
  );
};

export default LoginPageForm;
