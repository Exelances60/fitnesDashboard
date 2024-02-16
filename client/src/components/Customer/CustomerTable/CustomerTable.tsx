"use client";
import React from "react";
import { Table, Image, Button } from "antd";
import { CustomerType, ExerciseType } from "@/models/dataTypes";
import { renderMembershipStatus } from "@/utils/renderForTables/Customers/renderMembershipStatus";
import { renderCustomerEmailRender } from "@/utils/renderForTables/Customers/renderCustomerEmailRender";
import {
  HighlightOutlined,
  DeleteOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "@/store/store";
import { showModal } from "@/store/slices/modalSlice";
import { setShowDrawer } from "@/store/slices/drawerSlice";
import CustomerEditDrawer from "../CustomerDrawer/CustomerEditDrawer";
import CustomerDetailsModal from "../CustomerModal/CustomerDetailModal";
import CustomerEditFooter from "../CustomerDrawer/CustomerEditFooter";

interface CustomerTableProps {
  customers: CustomerType[];
  exersice: ExerciseType[];
}

const CustomerTable = ({ customers, exersice }: CustomerTableProps) => {
  const dispatch = useAppDispatch();

  const handleOnDetails = (record: CustomerType) => {
    dispatch(
      showModal({
        children: <CustomerDetailsModal customer={record} />,
        title: "Details Customer",
        footer: null,
      })
    );
  };

  const handleEditOnClick = (record: CustomerType) => {
    dispatch(
      setShowDrawer({
        children: <CustomerEditDrawer customer={record} exersice={exersice} />,
        title: "Edit Customer",
        footer: <CustomerEditFooter />,
      })
    );
  };
  return (
    <Table
      dataSource={customers}
      pagination={{ pageSize: 10 }}
      className="overflow-x-auto"
    >
      <Table.Column
        title="Image"
        dataIndex="profilePicture"
        key="profilePicture"
        render={(text) => {
          return (
            <Image
              src={`http://localhost:8080/${text}`}
              width={60}
              height={60}
              className="object-cover rounded-md"
              alt="profilePicture"
            />
          );
        }}
      />
      <Table.Column
        title="Name"
        dataIndex="name"
        key="name"
        render={(text) => {
          return <p>{text} </p>;
        }}
      />
      <Table.Column
        title="Phone"
        dataIndex="phone"
        key="phone"
        render={(text) => <p className="text-blue-500 underline">+90{text}</p>}
      />
      <Table.Column
        title="Email"
        dataIndex="email"
        key="email"
        width={180}
        className="overflow-hidden"
        render={renderCustomerEmailRender}
      />
      <Table.Column title="Age" dataIndex="age" key="age" />
      <Table.Column
        title="Membership"
        dataIndex="membershipStatus"
        key="membershipStatus"
        render={renderMembershipStatus}
      />
      <Table.Column
        title="Coach"
        dataIndex="coach"
        key="coach"
        render={(data) => {
          if (data) {
            return <p className="text-blue-500 underline">{data}</p>;
          }
          return <p className="text-red-500">Have not assigned yet</p>;
        }}
      />
      <Table.Column
        title="Membership Months"
        dataIndex="membershipType"
        key="membershipType"
        width={180}
        render={(text) => {
          return <p className="text-blue-500">{text} Months</p>;
        }}
      />
      <Table.Column
        title="Membership Start Date"
        dataIndex="membershipStartDate"
        key="membershipStartDate"
        render={(text) => {
          return (
            <div className="flex items-center justify-center">
              <p className="text-md font-bold">
                {new Date(text).toLocaleDateString()}
              </p>
            </div>
          );
        }}
      />
      <Table.Column
        title="Membership End Date"
        dataIndex="membershipEndDate"
        key="membershipEndDate"
        render={(text) => {
          return (
            <div className="flex items-center justify-center">
              <p className="text-md font-bold">
                {new Date(text).toLocaleDateString()}
              </p>
            </div>
          );
        }}
      />
      <Table.Column
        title="Action"
        dataIndex="action"
        key="action"
        render={(text, record: CustomerType) => {
          return (
            <div className="flex gap-2 items-center">
              <Button
                type="primary"
                ghost
                icon={<FolderOutlined />}
                onClick={() => handleOnDetails(record)}
              >
                Details
              </Button>
              <Button
                type="primary"
                ghost
                icon={<HighlightOutlined />}
                onClick={() => handleEditOnClick(record)}
              >
                Edit
              </Button>
              <Button type="primary" danger ghost icon={<DeleteOutlined />}>
                Delete
              </Button>
            </div>
          );
        }}
      />
    </Table>
  );
};

export default CustomerTable;
