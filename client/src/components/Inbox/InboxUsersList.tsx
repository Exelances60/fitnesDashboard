"use client";
import React from "react";
import Image from "next/image";
import useGetTokenPayload from "@/hooks/useGetTokenPayload";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUser } from "@/store/slices/userSlice";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import InboxUserListItem from "./InboxUserListItem";
import { selectChat, setChat } from "@/store/slices/inboxSlice";

interface InboxUsersListProps {
  employees: IEmployee[];
  chat: Chat[];
}

const InboxUsersList = ({ employees, chat }: InboxUsersListProps) => {
  const logginTokenPayload = useGetTokenPayload();
  const userInfo = useAppSelector(selectUser);
  const selectedChat = useAppSelector(selectChat);
  const dispatch = useAppDispatch();

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
    <div className="lg:w-[20%] p-2 lg:h-full flex flex-row lg:flex-col w-full gap-2 h-[20%]">
      <div className="flex flex-col items-center gap-2 rounded-lg p-1 w-full">
        <Popover content={usersContent} title="Users" trigger="click">
          <PlusCircleOutlined className="relative right-20 top-2 text-xl cursor-pointer drop-shadow-md" />
        </Popover>
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
      <div className="flex flex-col gap-2 overflow-auto w-full h-full">
        {chat ? (
          chat.map((chat) => {
            const participant = chat.participants.find(
              (p) => p.participantId._id !== logginTokenPayload?._id
            );
            return (
              <div
                onClick={() => {
                  dispatch(setChat(chat));
                }}
                key={chat._id}
                className={`w-full h-16 bg-gray-200 flex gap-4 items-center text-gray-800 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-gray-300 
                ${
                  selectedChat?._id === chat._id
                    ? "bg-gray-800 text-white hover:bg-gray-900"
                    : ""
                }
                  `}
              >
                <div className="lg:w-10 lg:h-12 relative rounded-full overflow-hidden drop-shadow-md hidden md:block">
                  <Image
                    src={
                      participant.participantId.ownerImage ||
                      participant.participantId.profilePicture ||
                      "/defaultProfile.png"
                    }
                    alt="profile"
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h1 className="text-sm md:text-md   text-ellipsis overflow-hidden">
                  {participant?.participantId.email}
                </h1>
              </div>
            );
          })
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-lg text-gray-500">No chats available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxUsersList;
