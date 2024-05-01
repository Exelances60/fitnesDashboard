import { fetchOwnerInfo } from "@/actions/fetchOwnerInfo";
import ErrorPage from "@/components/ErrorPage";
import SettingContainer from "@/components/Settings/SettingContainer";
import { Card } from "@tremor/react";
import React from "react";

const SettingPage = async () => {
  const ownerInfo = await fetchOwnerInfo();

  if (ownerInfo.errorMessage) {
    return (
      <ErrorPage
        error={ownerInfo.errorMessage}
        title="Failed to fetch owner info"
        status="error"
      />
    );
  }

  return (
    <div>
      <Card className="min-h-[810px] h-full max-h-[810px] overflow-y-auto">
        <SettingContainer ownerInfo={ownerInfo.owner ? ownerInfo.owner : {}} />
      </Card>
    </div>
  );
};

export default SettingPage;
