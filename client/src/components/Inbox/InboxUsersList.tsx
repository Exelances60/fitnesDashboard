"use client";
import React from "react";
import Image from "next/image";
import useGetTokenPayload from "@/hooks/useGetTokenPayload";
import { useAppSelector } from "@/store/store";
import { selectUser } from "@/store/slices/userSlice";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import InboxUserListItem from "./InboxUserListItem";

interface InboxUsersListProps {
  employees: IEmployee[];
}

const InboxUsersList = ({ employees }: InboxUsersListProps) => {
  const logginTokenPayload = useGetTokenPayload();
  const userInfo = useAppSelector(selectUser);

  const usersContent = (
    <div className="h-[500px] overflow-auto">
      {logginTokenPayload?._id !== userInfo?._id && (
        <InboxUserListItem
          employee={{
            _id: userInfo?._id as string,
            email: userInfo?.email,
            profilePicture: userInfo?.ownerImage ?? "",
          }}
        />
      )}
      <div className="flex flex-col items-center">
        {employees.map((employee) => {
          if (employee._id !== logginTokenPayload?._id) {
            return <InboxUserListItem key={employee._id} employee={employee} />;
          }
        })}
      </div>
    </div>
  );

  return (
    <div className="w-[20%] p-2 h-full">
      <Popover content={usersContent} title="Users" trigger="click">
        <PlusCircleOutlined className="relative right-0 top-0 text-xl cursor-pointer drop-shadow-md" />
      </Popover>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20  relative rounded-full">
          <Image
            src={logginTokenPayload?.image || ""}
            alt="profile"
            fill
            priority
            className="drop-shadow-lg rounded-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="text-center">
          <h1 className="text-md my-2">{logginTokenPayload?.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default InboxUsersList;
