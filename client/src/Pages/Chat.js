import React from "react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const { user } = ChatState();
  console.log("user id", user?.data?._id);

  return (
    <>
      <div>{user && <SideDrawer />}</div>
      <div className="flex justify-between mt-4">
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </>
  );
};

export default Chat;
