import React from "react";
import { ChatState } from "../context/ChatProvider";
import { getSender } from "../config/getSender";
import ProfileModel from "./ProfileModel";
import GroupModelUpdate from "./GroupModelUpdate";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  // console.log("single chat ", user);
  // console.log("single chat selected chat", selectedChat);
  return (
    <>
      <div>
        {selectedChat ? (
          <div className="text-3xl m-2">
            {!selectedChat.isGroupChat ? (
              <div className="flex justify-between">
                {getSender(user, selectedChat.users)}
                <ProfileModel />
              </div>
            ) : (
              <div className="flex justify-between">
                {selectedChat.chatName.toUpperCase()}
                <GroupModelUpdate
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center h-[675px] text-3xl text-center text-blue-800 ">
            Click on the User to start the chat{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default SingleChat;
