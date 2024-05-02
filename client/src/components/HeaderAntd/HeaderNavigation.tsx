import React from "react";
import NavigationCurrency from "./NavigationCurrency";
import ProfileCardNavi from "./ProfileCardNavi";

const HeaderNavigation = () => {
  return (
    <div className="flex items-center gap-5">
      <NavigationCurrency />
      <ProfileCardNavi />
    </div>
  );
};

export default HeaderNavigation;
