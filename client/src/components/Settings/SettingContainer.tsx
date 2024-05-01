"use client";
import React, { useState } from "react";
import { Grid } from "@tremor/react";
import SettingsUpdateForm from "./SettingsUpdateForm";
import SettingImageUpload from "./SettingImageUpload";

interface SettingContainerProps {
  ownerInfo: OwnerType | {};
}

const SettingContainer = ({ ownerInfo }: SettingContainerProps) => {
  const [ownerInfoState, setOwnerInfoState] = useState<OwnerType>(
    ownerInfo as OwnerType
  );

  return (
    <Grid
      numItems={1}
      numItemsSm={1}
      numItemsLg={1}
      className="gap-2 w-full h-full"
    >
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
    </Grid>
  );
};

export default SettingContainer;
