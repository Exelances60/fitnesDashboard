interface Message {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
  content: {
    iv: string;
    content: string;
  };
}
