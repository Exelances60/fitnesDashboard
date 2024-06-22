import React from "react";
import Image from "next/image";

interface InboxChatHeaderProps {
  selectedChat: {
    profilePicture?: string;
    email?: string;
  };
}

const InboxChatHeader = ({ selectedChat }: InboxChatHeaderProps) => {
  return (
    <>
      <div className="w-10 h-10 relative rounded-full">
        <Image
          src={selectedChat?.profilePicture || ""}
          alt="profile"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col ml-2">
        <span>{selectedChat?.email}</span>
      </div>
    </>
  );
};

export default InboxChatHeader;
