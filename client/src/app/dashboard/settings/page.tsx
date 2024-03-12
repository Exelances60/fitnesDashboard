import { fetchOwnerInfo } from "@/actions/fetchOwnerInfo";
import SettingContainer from "@/components/Settings/SettingContainer";
import { Card } from "@tremor/react";
import React from "react";

const SettingPage = async () => {
  const ownerInfo = await fetchOwnerInfo();

  if (!ownerInfo) {
    return <div>Failed to fetch owner info</div>;
  }

  return (
    <div>
      <Card className="min-h-[810px] h-full max-h-[810px]">
        <SettingContainer ownerInfo={ownerInfo.owner} />
      </Card>
    </div>
  );
};

export default SettingPage;
