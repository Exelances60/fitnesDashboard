"use client";
import { ConfigProvider, Spin, theme } from "antd";
import trTR from "antd/locale/tr_TR";
import "dayjs/locale/tr";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store/store";
import GlobalDrawer from "@/components/GlobalDrawer/GlobalDrawer";
import GlobalModal from "@/components/GlobalModal/GlobalModal";

const ConfigProviderComp = ({ children }: { children: React.ReactNode }) => {
  const { darkAlgorithm } = theme;
  return (
    <ConfigProvider
      locale={trTR}
      theme={{
        token: {},
      }}
    >
      <PersistGate
        loading={
          <>
            <div className="w-full h-[100vh] flex items-center justify-center">
              <Spin size="large" />
            </div>
          </>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
      <GlobalDrawer />
      <GlobalModal />
    </ConfigProvider>
  );
};

export default ConfigProviderComp;
