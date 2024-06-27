import { decrypt } from "@/utils/crypto";
import { Popover } from "antd";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import axiosClient from "@/utils/AxiosClient";
import { deleteMessageAction } from "@/store/slices/inboxSlice";
import useMessage from "@/hooks/useMessage";
import { useAppDispatch } from "@/store/store";

interface InboxMessageBubleProps {
  message: Message;
  isOwnMessage: boolean;
}

const InboxMessageBuble = ({
  message,
  isOwnMessage,
}: InboxMessageBubleProps) => {
  const dispatch = useAppDispatch();
  const showMessage = useMessage();

  const deleteMessage = async () => {
    try {
      const response = await axiosClient.post("/inbox/delete-message", {
        messageId: message._id,
      });
      const newMessage = response.data.data;
      dispatch(deleteMessageAction(newMessage));
      showMessage("Message deleted", "success");
    } catch (error) {
      showMessage("Failed to delete message", "error");
    }
  };

  const isMessageOlderThanOneHour = (createdAt: string) => {
    const oneHour = 60 * 60 * 1000;
    return Number(new Date()) - Number(new Date(createdAt)) > oneHour;
  };

  return (
    <div className="flex items-center gap-2">
      {isOwnMessage && !isMessageOlderThanOneHour(message.createdAt) ? (
        <Popover content="Delete" placement="top">
          <DeleteOutlined
            onClick={deleteMessage}
            className="text-lg cursor-pointer"
            style={{ color: "#b63a3a" }}
          />
        </Popover>
      ) : null}
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
    </div>
  );
};

export default InboxMessageBuble;
