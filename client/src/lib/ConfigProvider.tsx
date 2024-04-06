"use client";
import { useAppSelector } from "@/store/store";
import { ConfigProvider, theme } from "antd";
import trTR from "antd/locale/tr_TR";
import "dayjs/locale/tr";

const ConfigProviderComp = ({ children }: { children: React.ReactNode }) => {
  const { darkAlgorithm } = theme;
  return (
    <ConfigProvider
      locale={trTR}
      theme={{
        token: {},
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ConfigProviderComp;
