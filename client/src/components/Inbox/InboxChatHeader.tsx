import React from "react";
import Image from "next/image";

interface InboxChatHeaderProps {
  selectedChat: {
    email?: string;
    participants: any[];
  };
}

const InboxChatHeader = ({ selectedChat }: InboxChatHeaderProps) => {
  return (
    <>
      <div className="w-10 h-10 relative rounded-full">
        <Image
          src={
            selectedChat.participants[1].participantId.profilePicture ||
            selectedChat.participants[1].participantId.ownerImage ||
            ""
          }
          alt="profile"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col ml-2">
        <span>{selectedChat.participants[1].participantId.email}</span>
      </div>
    </>
  );
};

export default InboxChatHeader;
