import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { selectChat } from "@/store/slices/inboxSlice";

interface InboxUserListItemProps {
  employee: {
    _id: string;
    profilePicture?: string;
    email?: string;
  };
}

const InboxUserListItem = ({ employee }: InboxUserListItemProps) => {
  const dispatch = useDispatch();
  const handleUserClick = () => {
    dispatch(selectChat(employee));
  };
  return (
    <div
      key={employee._id}
      onClick={handleUserClick}
      className="flex items-center my-2 hover:bg-gray-200 p-2 rounded-lg ease-in-out transition-all duration-300 cursor-pointer w-[250px] text-ellipsis"
    >
      <div className="w-10 h-10 relative rounded-full">
        <Image
          src={employee.profilePicture || ""}
          alt="profile"
          layout="fill"
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
