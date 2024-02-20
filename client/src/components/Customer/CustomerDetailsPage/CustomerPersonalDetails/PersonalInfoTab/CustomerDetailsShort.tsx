import React from "react";
import { Button } from "antd";
import Image from "next/image";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { CustomerType } from "@/types/Customer";
import { MobileOutlined } from "@ant-design/icons";

const CustomerDetailsShort = ({ customer }: { customer: CustomerType }) => {
  return (
    <>
      <div className="flex flex-col items-center  min-h-96 h-[800px] bg-white shadow rounded-md overflow-auto">
        <div className="w-full h-[200px] relative">
          <Image
            src="https://react-material.fusetheme.com/assets/images/cards/19-640x480.jpg"
            layout="fill"
            objectFit="cover"
            alt="Customer Image"
            className="rounded-t-md"
          />
        </div>
        <div className="relative md:bottom-20 bottom-[80px] md:h-32 h-28 rounded-full md:w-32 w-28 border-4 border-white ">
          <Image
            src={`https://fitnesdashboard.onrender.com/${customer.profilePicture}`}
            layout="fill"
            objectFit="cover"
            alt="Customer Image"
            className="rounded-full"
          />
        </div>
        <div
          className="flex flex-col items-center gap-2 p-2"
          style={{ marginTop: "-70px" }}
        >
          <h1 className="text-2xl font-bold">{customer.name}</h1>
          <p className="text-sm text-gray-500">
            <MailOutlined className="text-lg mr-1" /> {customer.email}
          </p>
          <p className="text-sm text-gray-500">
            <PhoneOutlined className="text-lg mr-1" />
            {customer.phone}
          </p>
          <Button type="primary" ghost icon={<MobileOutlined />}>
            Contact
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomerDetailsShort;
