import React from "react";
import { SendOutlined } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectChat, setChat } from "@/store/slices/inboxSlice";
import useGetTokenPayload from "@/hooks/useGetTokenPayload";
import { socket } from "@/utils/socket";

const InboxChatInput = () => {
  const logginUserToken = useGetTokenPayload();
  const selectedChat = useAppSelector(selectChat);
  const [form] = Form.useForm();
  const handleSendMessage = (value: { message: string }) => {
    if (!selectedChat)
      return message.error({ content: "Select a chat", duration: 2 });
    try {
      const bodyValue = {
        content: value.message,
        senderId: logginUserToken?._id,
        receiverId:
          selectedChat.employeeId ||
          selectedChat.participants[1].participantId._id,
        chatId: selectedChat._id,
      };

      socket.emit("joinRoom", () => {
        socket.emit("sendMessage", selectedChat._id);
      });
      socket.emit("sendMessage", bodyValue);

      form.setFieldsValue({ message: "" });
    } catch (error) {
      message.error({
        content: "Failed to send message",
        duration: 2,
      });
    }
  };

  return (
    <div className="w-full flex gap-2 h-16 p-2 rounded-lg mt-2">
      <Form
        form={form}
        onFinish={handleSendMessage}
        className="w-full h-full flex gap-2"
      >
        <Form.Item name="message" className="w-full h-full">
          <Input
            placeholder="Type a message"
            size="large"
            className="w-full h-full rounded-lg bg-white border focus:outline-none"
          />
        </Form.Item>
        <Form.Item className="h-full">
          <button type="submit" className="text-xl mt-1 cursor-pointer">
            <SendOutlined type="submit" className="text-xl cursor-pointer" />
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InboxChatInput;
