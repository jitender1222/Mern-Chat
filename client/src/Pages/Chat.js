import React from "react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const { user } = ChatState();

  return (
    <>
      <div>{user && <SideDrawer />}</div>
      <div className="flex justify-between">
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </>
  );
};

export default Chat;
