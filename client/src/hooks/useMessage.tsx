import React from "react";
import { message } from "antd";
import { useRouter } from "next/navigation";

const useMessage = () => {
  const router = useRouter();
  const showMessage = (
    text: string,
    type: "success" | "error" | "loading" | "info" | "warning" = "success",
    time?: number
  ) => {
    if (type === "loading") {
      return message[type](text, time);
    }
    if (type === "success") {
      console.log("router refresh");
      message[type](text);
      router.refresh();
    }
  };
  return showMessage;
};

export default useMessage;
