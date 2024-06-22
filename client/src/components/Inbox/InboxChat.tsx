"use client";
import React, { useEffect, useState } from "react";
import { selectChat } from "@/store/slices/inboxSlice";
import { useAppSelector } from "@/store/store";
import InboxChatInput from "./InboxChatInput";
import InboxChatHeader from "./InboxChatHeader";
import { socket } from "@/utils/socket";
import useGetTokenPayload from "@/hooks/useGetTokenPayload";
import InboxChatMessage from "./InboxChatMessage";

const InboxChat = () => {
  const logginUserToken = useGetTokenPayload();
  const [messages, setMessages] = useState<Message[]>([]);
  const selectedChat = useAppSelector(selectChat);

  useEffect(() => {
    if (selectedChat) {
      socket.emit("joinRoom", selectedChat._id);
      socket.on("message", async (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }
    return () => {
      socket.off("message");
    };
  }, [selectedChat, setMessages]);
  console.log(logginUserToken?.image);

  return (
    <div className="w-full h-full border-l-2 p-4 flex flex-col items-center justify-between border-gray-300 bg-[#f7fcfd]">
      <div className="w-full px-4 py-2 box-border rounded-t-lg h-16 flex items-center bg-gray-100 shadow-md">
        {selectedChat && <InboxChatHeader selectedChat={selectedChat} />}
      </div>
      <div className="w-full flex-1 p-4 bg-gray-100 rounded-b-lg mt-2 flex flex-col gap-4 overflow-auto">
        {selectedChat ? (
          <>
            {selectedChat.messages.map((message, index) => (
              <InboxChatMessage
                key={index}
                message={message}
                isOwnMessage={message.senderId === logginUserToken?._id}
                profilePicture={
                  message.senderId === logginUserToken?._id
                    ? logginUserToken?.image
                    : selectedChat.profilePicture
                }
              />
            ))}
            {messages.map((message, index) => (
              <InboxChatMessage
                key={index}
                message={message}
                isOwnMessage={message.senderId === logginUserToken?._id}
                profilePicture={
                  message.senderId === logginUserToken?._id
                    ? logginUserToken?.image
                    : selectedChat.profilePicture
                }
              />
            ))}
          </>
        ) : (
          <div className="text-center w-full h-full font-semibold flex items-center justify-center text-gray-500">
            Select a chat
          </div>
        )}
      </div>
      <div className="w-full mt-4">
        <InboxChatInput />
      </div>
    </div>
  );
};

export default InboxChat;
