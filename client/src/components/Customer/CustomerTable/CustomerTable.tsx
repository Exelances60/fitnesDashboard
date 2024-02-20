"use client";
import React from "react";
import { Table, Image, Button, Popconfirm } from "antd";
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
import { CustomerType } from "@/types/Customer";
import useMessage from "@/hooks/useMessage";
import axiosClient from "@/utils/AxiosClient";
import useTableFilterSearchDropDown from "@/hooks/useTableFilterSearchDropDown";

interface CustomerTableProps {
  customers: CustomerType[];
}

const CustomerTable = ({ customers }: CustomerTableProps) => {
  const dispatch = useAppDispatch();
  const showMessage = useMessage();
  const { filterDropdown, filterIcon, searchById } =
    useTableFilterSearchDropDown();
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
        children: <CustomerEditDrawer customer={record} />,
        title: "Edit Customer",
        footer: <CustomerEditFooter />,
      })
    );
  };

  const handleDeleteCustomerOnClick = async (record: CustomerType) => {
    showMessage("Wait a moment", "loading", 0.4);
    try {
      const response = await axiosClient.delete(
        `/customers/delete-customer/${record._id}`
      );
      if (response.status === 200) {
        showMessage("Customer deleted successfully", "success", 2);
      }
    } catch (error) {
      showMessage("An error occurred", "error", 2);
    }
  };

  const diplayCustomers = customers.filter((customer) => {
    return customer.name.toLowerCase().includes(searchById.toLowerCase());
  });

  return (
    <Table
      dataSource={diplayCustomers}
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
              src={`https://fitnesdashboard.onrender.com/${text}`}
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
        filterDropdown={filterDropdown}
        filterIcon={filterIcon}
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
      <Table.Column
        title="Age"
        dataIndex="age"
        key="age"
        sorter={(a: CustomerType, b: CustomerType) => a.age - b.age}
      />
      <Table.Column
        title="Membership"
        dataIndex="membershipStatus"
        key="membershipStatus"
        filters={[
          { text: "Standart", value: "standart" },
          { text: "Passive", value: "passive" },
          { text: "Vip", value: "vip" },
        ]}
        onFilter={(value: any, record: CustomerType) =>
          record.membershipStatus.indexOf(value) === 0
        }
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
              <p>{new Date(text).toLocaleDateString()}</p>
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
              <p>{new Date(text).toLocaleDateString()}</p>
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
              <Popconfirm
                title="Are you sure to delete this customer?"
                onConfirm={() => handleDeleteCustomerOnClick(record)}
              >
                <Button type="primary" danger ghost icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          );
        }}
      />
    </Table>
  );
};

export default CustomerTable;
