"use client";
import React from "react";
import { Grid } from "@tremor/react";
import SettingsUpdateForm from "./SettingsUpdateForm";
import SettingImageUpload from "./SettingImageUpload";
import { Tabs, TabsProps } from "antd";
import ProfileTabContainer from "./Profile/ProfileTabContainer";
import { useGetScreenSize } from "@/hooks/useGetScreenSize";
import { useAppSelector } from "@/store/store";
import { selectUser } from "@/store/slices/userSlice";
import ErrorPage from "../ErrorPage";
import useGetTokenPayload from "@/hooks/useGetTokenPayload";

const SettingContainer = () => {
  const screens = useGetScreenSize();
  const userInfo = useGetTokenPayload();
  const ownerInfoStateRedux = useAppSelector(selectUser);

  if (!ownerInfoStateRedux) {
    return (
      <ErrorPage
        title="Error"
        error="Owner Info not found"
        status="404"
        key={404}
      />
    );
  }

  const tabItems: TabsProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      children: <ProfileTabContainer ownerInfo={ownerInfoStateRedux} />,
    },
    {
      key: "settings",
      label: "Settings",
      disabled: userInfo?.role !== "owner",
      children: (
        <>
          <div className="w-full items-center  h-full flex flex-col gap-2">
            <SettingImageUpload ownerInfo={ownerInfoStateRedux} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <SettingsUpdateForm ownerInfo={ownerInfoStateRedux} />
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
        tabPosition={screens.xs ? "top" : "left"}
      />
    </Grid>
  );
};

export default SettingContainer;
