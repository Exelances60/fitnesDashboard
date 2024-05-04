import SettingContainer from "@/components/Settings/SettingContainer";
import { Card } from "@tremor/react";
import React from "react";

const SettingPage = async () => {
  return (
    <div>
      <Card className="min-h-[810px] h-full max-h-[810px] overflow-y-auto">
        <SettingContainer />
      </Card>
    </div>
  );
};

export default SettingPage;
