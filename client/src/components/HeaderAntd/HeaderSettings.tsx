import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store/store";
import { setShowDrawer } from "@/store/slices/drawerSlice";
import DashboardSelect from "../Dashboard/DashboardSelect";

const HeaderSettings = () => {
  const dispatch = useAppDispatch();
  const handleClicked = () => {
    dispatch(
      setShowDrawer({
        title: "Settings",
        children: <DashboardSelect />,
      })
    );
  };
  return (
    <>
      <SettingOutlined
        onClick={handleClicked}
        className="text-xl text-gray-500 cursor-pointer hover:text-gray-900 transition-colors duration-200"
      />
    </>
  );
};

export default HeaderSettings;
