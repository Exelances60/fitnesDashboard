import { Result } from "antd";
import Link from "next/link";
import React from "react";

interface IErrorPage {
  error: string;
  status: "403" | "404" | "500" | "error" | "success" | "info" | "warning";
  title: string;
}

const ErrorPage = ({ error, status, title }: IErrorPage) => {
  return (
    <Result
      status={status}
      title={title}
      subTitle={error}
      extra={<Link href="/dashboard">Back Home</Link>}
    />
  );
};

export default ErrorPage;
