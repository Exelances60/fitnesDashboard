import React from "react";
import Image from "next/image";
import { selectChat, setChat } from "@/store/slices/inboxSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import useGetTokenPayload from "@/hooks/useGetTokenPayload";
import axiosClient from "@/utils/AxiosClient";
import { message } from "antd";
import { useRouter } from "next/navigation";

interface InboxUserListItemProps {
  employee: {
    _id: string;
    profilePicture?: string;
    email?: string;
  };
}

const InboxUserListItem = ({ employee }: InboxUserListItemProps) => {
  const dispatch = useAppDispatch();
  const logginUserToken = useGetTokenPayload();
  const selectedChat = useAppSelector(selectChat);
  const router = useRouter();

  const handleUserClick = async () => {
    try {
      const bodyValue = {
        senderId: logginUserToken?._id,
        receiverId: employee._id,
        role: logginUserToken?.role,
      };
      const response = await axiosClient.post("/inbox/create-chat", bodyValue);
      dispatch(setChat(response.data.chat));
      router.refresh();
    } catch (error) {
      message.error({
        content: "Failed to create chat",
        duration: 2,
      });
    }
  };
  return (
    <div
      key={employee._id}
      onClick={handleUserClick}
      className={`flex items-center my-2 p-2 rounded-lg ease-in-out transition-all duration-300 cursor-pointer w-[250px] text-ellipsis
      ${
        selectedChat?._id === employee._id
          ? "bg-gray-300 px-3 rounded-lg"
          : "hover:bg-gray-200"
      }`}
    >
      <div className="w-10 h-10 relative rounded-full">
        <Image
          src={employee.profilePicture || ""}
          alt="profile"
          fill
          className="drop-shadow-lg rounded-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
        />
      </div>
      <h1 className="text-md ml-2">{employee.email}</h1>
    </div>
  );
};

export default InboxUserListItem;
