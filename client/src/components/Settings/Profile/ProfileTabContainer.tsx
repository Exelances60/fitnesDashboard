import React from "react";
import useFetchCustomerDataForClient from "@/hooks/useFetchCustomerDataForClient";
import Image from "next/image";
import { Avatar, Spin, Tooltip } from "antd";
import useFetchEmployeesForClient from "@/hooks/useFetchEmployeesForClient";

interface IProfileTabContainerProps {
  ownerInfo: OwnerType;
}

const ProfileTabContainer = ({ ownerInfo }: IProfileTabContainerProps) => {
  const customerData = useFetchCustomerDataForClient();
  const employeeData = useFetchEmployeesForClient();

  return (
    <Spin spinning={!customerData || !employeeData}>
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <header className="w-full h-32 flex items-center p-2 border-b border-gray-200">
          <div className="flex-shrink-0">
            <Image
              className="rounded-full"
              src={ownerInfo.ownerImage || ""}
              alt="owner"
              width={75}
              height={75}
            />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {ownerInfo.companyName}
            </h1>
            <p className="text-gray-600">{ownerInfo.email}</p>
            <p className="text-gray-600">{ownerInfo.phone}</p>
          </div>
        </header>
        <section className="w-full h-32 flex gap-5 mt-4">
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-xl font-semibold text-gray-700">
              Customers List: {customerData.length}
            </h2>
            <Avatar.Group maxCount={3}>
              {customerData.map((customer) => (
                <Tooltip title={customer.name} key={customer._id}>
                  <Avatar
                    shape="square"
                    key={customer._id}
                    src={customer.profilePicture}
                  />
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-xl font-semibold text-gray-700">
              Employees List: {employeeData.length}
            </h2>
            <Avatar.Group maxCount={3}>
              {employeeData.map((employee) => (
                <Tooltip title={employee.name} key={employee._id}>
                  <Avatar
                    shape="square"
                    key={employee._id}
                    src={employee.profilePicture}
                  />
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
        </section>
      </div>
    </Spin>
  );
};

export default ProfileTabContainer;
