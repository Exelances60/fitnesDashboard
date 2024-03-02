"use client";
import React from "react";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAppDispatch } from "@/store/store";
import { setShowDrawer } from "@/store/slices/drawerSlice";
import CustomerAddModal from "./CustomerModal/CustomerAddModal";
import DrawerFooterButton from "../DrawerFooterButton";

const CustomerContainerHeader = () => {
  const dispatch = useAppDispatch();

  const handleOpenAddCustomer = () => {
    dispatch(
      setShowDrawer({
        children: <CustomerAddModal />,
        title: "Customer Add Modal",
        footer: <DrawerFooterButton formName="customerAddForm" />,
      })
    );
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-lg flex gap-2">
        <UserOutlined />
        <p className="font-bold"> Customer </p>
      </h1>
      <Button
        type="primary"
        ghost
        onClick={handleOpenAddCustomer}
        icon={<UserAddOutlined />}
      >
        Add To Customer
      </Button>
    </div>
  );
};

export default CustomerContainerHeader;
