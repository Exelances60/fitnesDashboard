import Image from "next/image";
import React from "react";
import NOUSERIMAGE from "@/../public/customer/noUser.webp";
import { Grid } from "@tremor/react";
import { Button, Upload } from "antd";
import SettingsUpdateForm from "./SettingsUpdateForm";

interface SettingContainerProps {
  ownerInfo: OwnerType;
}

const SettingContainer = ({ ownerInfo }: SettingContainerProps) => {
  return (
    <Grid
      numItems={1}
      numItemsSm={1}
      numItemsLg={1}
      className="gap-2 w-full h-full"
    >
      <div className="w-full items-center  h-full flex flex-col gap-2">
        <Image
          src={
            ownerInfo.ownerImage
              ? `http://localhost:8080/${ownerInfo.ownerImage}`
              : NOUSERIMAGE
          }
          alt={ownerInfo.companyName}
          width={100}
          height={100}
          className="rounded-full"
        />
        {!ownerInfo.ownerImage ? (
          <div className="flex gap-2">
            <Upload name="ownerImage" listType="picture">
              <Button>Upload</Button>
            </Upload>
            <Button type="primary">Save</Button>
          </div>
        ) : null}
        <h1>🏢 {ownerInfo.companyName}</h1>
        <h2>📧 {ownerInfo.email}</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <SettingsUpdateForm ownerInfo={ownerInfo} />
      </div>
    </Grid>
  );
};

export default SettingContainer;
