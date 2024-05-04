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
      return message[type]({ content: text, key: "hooks" });
    }
    if (type === "success") {
      console.log("router refresh");
      message[type]({ content: text, key: "hooks" });
      router.refresh();
    }
    if (type === "error") {
      message[type]({ content: text, key: "hooks" });
    }
    if (type === "info") {
      message[type]({ content: text, key: "hooks" });
    }
    if (type === "warning") {
      message[type]({ content: text, key: "hooks" });
    }
  };
  return showMessage;
};

export default useMessage;
