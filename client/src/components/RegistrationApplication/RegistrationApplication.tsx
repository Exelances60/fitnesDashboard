"use client";
import React from "react";
import { Avatar, Steps } from "antd";
import { StepsProps } from "antd/lib";

interface RegistrationApplicationProps {
  data?: {
    email: string;
    companyName: string;
    address: string;
    phone: string;
    ownerImage: string;
    _id: string;
    status: string;
  };
}

const RegistrationApplicationStatus = ({
  data,
}: RegistrationApplicationProps) => {
  const items: StepsProps["items"] = [
    {
      title: "Sending",
      description: "Your application is sending.",
    },
    {
      title: "Under Review",
      description: "Your application is under review.",
    },
    {
      title: "Approved",
      description: "Your application is under review.",
    },
  ];

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-2xl text-red-500">No data</div>
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <Avatar src={data.ownerImage} size={100} />
      <div className="text-2xl">{data.companyName}</div>
      <div className="text-xl">{data.email}</div>
      <div className="text-xl">{data.phone}</div>
      <div className="text-xl">{data.address}</div>
      <div className="w-1/2 mt-5">
        <Steps
          items={items}
          current={
            data.status === "pending"
              ? 0
              : data.status === "under review"
              ? 1
              : 2
          }
        />
      </div>
    </div>
  );
};

export default RegistrationApplicationStatus;
