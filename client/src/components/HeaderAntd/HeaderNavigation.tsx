import React from "react";
import NavigationCurrency from "./NavigationCurrency";
import ProfileCardNavi from "./ProfileCardNavi";
import HeaderSettings from "./HeaderSettings";
import LocaleComponent from "../LocaleComponent";

const HeaderNavigation = () => {
  return (
    <div className="flex items-center gap-5">
      <LocaleComponent />
      <NavigationCurrency />
      <HeaderSettings />
      <ProfileCardNavi />
    </div>
  );
};

export default HeaderNavigation;
