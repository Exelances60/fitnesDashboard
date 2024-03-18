import Map from "@/components/Map";
import { capitalizeFirstLetter } from "@/utils/utils";
import { Descriptions, Badge, DescriptionsProps } from "antd";
import React from "react";

const CustomerPersonalDetails = ({ customer }: { customer: CustomerType }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: customer.name,
    },
    {
      key: "2",
      label: "Age",
      children: customer.age,
      span: 2,
    },
    {
      key: "3",
      label: "Phone Number",
      children: customer.phone,
    },
    {
      key: "4",
      label: `Parent Phone Number`,
      children: <>{customer.parentPhone || "N/A"}</>,
      span: 2,
    },
    {
      key: "5",
      label: "Created At",
      children: customer.membershipStartDate,
    },
    {
      key: "6",
      label: "End Date",
      children: customer.membershipEndDate,
      span: 2,
    },
    {
      key: "7",
      label: "Email",
      children: customer.email,
    },
    {
      key: "8",
      label: "Status",
      children: (
        <Badge
          status="processing"
          text={capitalizeFirstLetter(customer.membershipStatus) || "Active"}
        />
      ),
      span: 2,
    },
    {
      key: "9",
      label: "Membership Price",
      children: `${customer.membershipPrice} TL`,
    },
    {
      key: "10",
      label: "Body Weight",
      children: `${customer.bodyWeight} kg`,
    },
    {
      key: "11",
      label: "Height",
      children: `${customer.height} cm`,
    },
    {
      key: "12",
      label: "Blood Type",
      children: customer.bloodGroup,
      span: 3,
    },
    {
      key: "13",
      label: "Address",
      children: customer.address,
      span: 3,
    },
    {
      key: "14",
      label: "Map",
      children: (
        <div className="w-full h-96 ">
          <Map address={customer.address} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Descriptions title="Customer Info" bordered items={items} />
    </div>
  );
};

export default CustomerPersonalDetails;
