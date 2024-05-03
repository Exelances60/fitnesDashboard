import React from "react";
import useFetchCustomerDataForClient from "@/hooks/useFetchCustomerDataForClient";
import Image from "next/image";
import { Avatar, Tooltip } from "antd";

interface IProfileTabContainerProps {
  ownerInfo: OwnerType;
}

const ProfileTabContainer = ({ ownerInfo }: IProfileTabContainerProps) => {
  const customerData = useFetchCustomerDataForClient();

  return (
    <div className="w-full">
      <header className="w-full h-32 flex items-center p-2">
        <div>
          <Image
            src={ownerInfo.ownerImage || ""}
            alt="owner"
            width={75}
            height={75}
          />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl">{ownerInfo.companyName}</h1>
          <p>{ownerInfo.email}</p>
          <p>{ownerInfo.phone}</p>
        </div>
      </header>
      <section className="w-full h-32 flex  gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl">Customers List : {customerData.length}</h2>
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
      </section>
    </div>
  );
};

export default ProfileTabContainer;
