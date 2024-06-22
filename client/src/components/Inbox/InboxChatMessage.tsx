import React from "react";
import InboxProfileImage from "./InboxProfileImage";
import InboxMessageBuble from "./InboxMessageBuble";

interface InboxChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
  profilePicture?: string;
}

const InboxChatMessage = ({
  message,
  isOwnMessage,
  profilePicture,
}: InboxChatMessageProps) => {
  return (
    <div
      className={`flex ${
        isOwnMessage ? "justify-end" : "justify-start"
      } items-center gap-2`}
    >
      {!isOwnMessage && (
        <InboxProfileImage src={profilePicture} alt="profile picture" />
      )}
      <InboxMessageBuble message={message} isOwnMessage={isOwnMessage} />
      {isOwnMessage && (
        <InboxProfileImage src={profilePicture} alt="profile picture" />
      )}
    </div>
  );
};

export default InboxChatMessage;
