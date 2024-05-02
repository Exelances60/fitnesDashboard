import React from "react";

interface IProfileTabContainerProps {
  ownerInfo: OwnerType;
}

const ProfileTabContainer = ({ ownerInfo }: IProfileTabContainerProps) => {
  console.log(ownerInfo);
  return <div>ProfileTabContainer</div>;
};

export default ProfileTabContainer;
