import React from "react";
import { message } from "antd";
import { useRouter } from "next/navigation";

const useMessage = () => {
  const router = useRouter();
  const showMessage = (
    text: string,
    type: "success" | "error" | "loading" | "info" | "warning" = "success"
  ) => {
    message[type](text);
    if (type === "success") {
      console.log("router refresh");
      router.refresh();
    }
  };
  return showMessage;
};

export default useMessage;
