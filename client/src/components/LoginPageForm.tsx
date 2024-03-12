"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axiosClient from "@/utils/AxiosClient";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import { emailRules } from "@/utils/FormRules";

const LoginPageForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      message.info({ content: "You are already logged in", key: "login" });
      router.push("/dashboard");
    }
  }, [router]);

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

    axiosClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.token}`;

    dispatch(setUser(user));
    setError("");
    message.destroy("login");
    message.success("Login Success");
    router.push("/dashboard");
  };

  const onFinish = async (values: { email: string; password: string }) => {
    message.loading({ content: "Loading...", key: "login" });
    setLoading(true);
    try {
      const { data, status } = await axiosClient.post("/auth/login", values);
      if (status === 200) {
        handleSuccess(data);
      }
    } catch (error: any) {
      message.destroy("login");
      message.error(error.response?.data.message || "Something went wrong");
      setError(error.response?.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-10">
      <Form
        className="flex flex-col gap-[10px] justify-center"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="email" rules={emailRules} label="Email">
          <Input
            type="text"
            placeholder="Email"
            value={""}
            className="w-[300px] md:w-[500px] h-[50px] px-[20px] bg-[#F0F2F5] rounded-[10px]"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please Input your Password!" }]}
          label="Password"
        >
          <Input.Password
            type="password"
            placeholder="Password"
            value={""}
            className="w-[300px] md:w-[500px] h-[50px] px-[20px] bg-[#F0F2F5] rounded-[10px]"
          />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          loading={loading}
          className="w-[300px] md:w-[500px] h-[50px] bg-[#4880FF] rounded-[10px] text-white font-bold"
        >
          Login
        </Button>
        {error ? <p className="text-red-500">{error}</p> : null}
      </Form>
    </div>
  );
};

export default LoginPageForm;
