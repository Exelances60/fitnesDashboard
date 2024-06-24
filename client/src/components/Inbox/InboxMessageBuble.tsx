import { decrypt } from "@/utils/crypto";
import { Popover } from "antd";
import React from "react";

interface InboxMessageBubleProps {
  message: Message;
  isOwnMessage: boolean;
}

const InboxMessageBuble = ({
  message,
  isOwnMessage,
}: InboxMessageBubleProps) => {
  return (
    <Popover
      content={new Date(message.createdAt).toLocaleString()}
      placement="left"
    >
      <span
        className={`inline-block max-w-xs break-words ${
          isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        } p-3 rounded-lg shadow`}
      >
        {decrypt(message.content)}
      </span>
    </Popover>
  );
};

export default InboxMessageBuble;
