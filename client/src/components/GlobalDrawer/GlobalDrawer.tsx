import React from "react";
import { Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  selectDrawerProps,
  selectDrawerVisible,
  setHideDrawer,
} from "@/store/slices/drawerSlice";

const GlobalDrawer = () => {
  const dispatch = useAppDispatch();
  const drawerVisible = useAppSelector(selectDrawerVisible);
  const drawerProps = useAppSelector(selectDrawerProps);
  const onClose = () => {
    dispatch(setHideDrawer());
  };

  return (
    <Drawer
      title={drawerProps.title}
      placement="right"
      open={drawerVisible}
      onClose={onClose}
      size="large"
      footer={drawerProps.footer}
    >
      {drawerProps.children}
    </Drawer>
  );
};
export default GlobalDrawer;
