"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  selectChat,
  setChat,
  setMessagesAction,
} from "@/store/slices/inboxSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import InboxChatInput from "./InboxChatInput";
import InboxChatHeader from "./InboxChatHeader";
import { socket } from "@/utils/socket";
import useGetTokenPayload from "@/hooks/useGetTokenPayload";
import InboxChatMessage from "./InboxChatMessage";
import { useTranslations } from "next-intl";
const InboxChat = () => {
  const t = useTranslations("Inbox.InboxChat");
  const logginUserToken = useGetTokenPayload();
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<Message[]>([]);
  const selectedChat = useAppSelector(selectChat);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      dispatch(setChat(null));
    };
  }, []);

  useEffect(() => {
    if (selectedChat) {
      socket.emit("joinRoom", selectedChat._id);
      socket.on("message", handleMessage);
    }
    return () => {
      socket.off("message", handleMessage);
    };
  }, [selectedChat, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]);

  const handleMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
    if (selectedChat) {
      dispatch(setMessagesAction(message));
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getProfilePicture = (senderId: string): string => {
    const participant = selectedChat?.participants.find(
      (participant) => participant.participantId._id === senderId
    );
    return (
      participant?.participantId.profilePicture ||
      participant?.participantId.ownerImage ||
      ""
    );
  };

  const renderMessages = (messagesArray: Message[]) => {
    return messagesArray.map((message, index) => (
      <InboxChatMessage
        key={index}
        message={message}
        isOwnMessage={message.senderId === logginUserToken?._id}
        profilePicture={
          message.senderId === logginUserToken?._id
            ? logginUserToken?.image
            : getProfilePicture(message.senderId)
        }
      />
    ));
  };

  return (
    <div className="w-full h-full border-l-2 p-4 flex flex-col items-center justify-between border-gray-300 bg-[#f7fcfd]">
      <div className="w-full px-4 py-2 box-border rounded-t-lg h-16 flex items-center bg-gray-100 shadow-md">
        {selectedChat && <InboxChatHeader selectedChat={selectedChat} />}
      </div>
      <div className="w-full flex-1 p-4 bg-gray-100 rounded-b-lg mt-2 flex flex-col gap-4 overflow-y-auto">
        {selectedChat ? (
          <>
            {renderMessages(selectedChat.messages)}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="text-center w-full h-full font-semibold flex items-center justify-center text-gray-500">
            {t("noChatsAvailable")}
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
