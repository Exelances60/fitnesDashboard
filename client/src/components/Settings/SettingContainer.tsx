"use client";
import React, { useState } from "react";
import { Grid } from "@tremor/react";
import SettingsUpdateForm from "./SettingsUpdateForm";
import SettingImageUpload from "./SettingImageUpload";
import { Tabs, TabsProps } from "antd";
import ProfileTabContainer from "./Profile/ProfileTabContainer";

interface SettingContainerProps {
  ownerInfo: OwnerType | {};
}

const SettingContainer = ({ ownerInfo }: SettingContainerProps) => {
  const [ownerInfoState, setOwnerInfoState] = useState<OwnerType>(
    ownerInfo as OwnerType
  );
  const tabItems: TabsProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      children: <ProfileTabContainer ownerInfo={ownerInfoState} />,
    },
    {
      key: "settings",
      label: "Settings",
      children: (
        <>
          <div className="w-full items-center  h-full flex flex-col gap-2">
            <SettingImageUpload
              ownerInfo={ownerInfoState}
              setOwnerInfoState={setOwnerInfoState}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <SettingsUpdateForm
              ownerInfo={ownerInfoState}
              setOwnerInfoState={setOwnerInfoState}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <Grid
      numItems={1}
      numItemsSm={1}
      numItemsLg={1}
      className="gap-2 w-full h-full"
    >
      <Tabs
        items={tabItems}
        defaultValue="profile"
        className="w-full h-full"
        tabPosition="left"
      />
    </Grid>
  );
};

export default SettingContainer;
