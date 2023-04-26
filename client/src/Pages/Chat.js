import React from "react";
import { ChatState } from "../context/ChatProvider";

const Chat = () => {
  const { user } = ChatState();
  console.log("user id", user);

  return <>Helo world</>;
};

export default Chat;
