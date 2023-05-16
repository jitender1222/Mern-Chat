import React from "react";
import { ChatState } from "../context/ChatProvider";
import { getSender } from "../config/getSender";
import ProfileModel from "./ProfileModel";
import { getSenderFull } from "../config/getSender";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  return (
    <>
      <div>
        {selectedChat ? (
          <div className="text-3xl m-2">
            {!selectedChat.isGroupChat ? (
              <div className="flex justify-between">
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.user)} />
              </div>
            ) : (
              <div>{selectedChat.chatName.toUpperCase()}</div>
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
