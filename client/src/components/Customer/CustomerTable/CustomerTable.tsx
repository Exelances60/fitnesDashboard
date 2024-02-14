"use client";
import React from "react";
import { Table, Image } from "antd";
import { CustomerType } from "@/models/dataTypes";
import { renderMembershipStatus } from "@/utils/renderForTables/Customers/renderMembershipStatus";
import { renderCustomerEmailRender } from "@/utils/renderForTables/Customers/renderCustomerEmailRender";

interface CustomerTableProps {
  customers: CustomerType[];
}

const CustomerTable = ({ customers }: CustomerTableProps) => {
  return (
    <Table
      dataSource={customers}
      pagination={{ pageSize: 10 }}
      className="overflow-x-auto"
    >
      <Table.Column
        title="Name"
        dataIndex="name"
        key="name"
        render={(text, record: CustomerType) => {
          return (
            <div className="flex gap-2 items-center">
              <Image
                src={`http://localhost:8080/${record.profilePicture}`}
                alt={text}
                width={50}
                height={50}
                className="object-cover "
              />
              <p>{text}</p>
            </div>
          );
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
        width={180}
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
      />
      <Table.Column
        title="Membership End Date"
        dataIndex="membershipEndDate"
        key="membershipEndDate"
      />
    </Table>
  );
};

export default CustomerTable;
