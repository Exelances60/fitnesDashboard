"use client";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAppDispatch } from "@/store/store";
import CustomerAddModal from "./CustomerModal/CustomerAddModal";
import CustomerAddModalFooter from "./CustomerModal/CustomerAddModalFooter";
import { setShowDrawer } from "@/store/slices/drawerSlice";

const CustomerContainerHeader = () => {
  const dispatch = useAppDispatch();

  const handleOpenAddCustomer = () => {
    dispatch(
      setShowDrawer({
        children: <CustomerAddModal />,
        title: "Customer Add Modal",
        footer: <CustomerAddModalFooter />,
      })
    );
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-lg flex gap-2">
        <UserOutlined />
        <p className="font-bold"> Customer </p>
      </h1>
      <Button type="primary" ghost onClick={handleOpenAddCustomer}>
        Add To Customer
      </Button>
    </div>
  );
};

export default CustomerContainerHeader;
