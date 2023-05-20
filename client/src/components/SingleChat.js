import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { getSender } from "../config/getSender";
import ProfileModel from "./ProfileModel";
import GroupModelUpdate from "./GroupModelUpdate";
import axios from "axios";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const { user, selectedChat, setSelectedChat } = ChatState();
  // console.log("single chat ", user);
  // console.log("single chat selected chat", selectedChat);

  const fetchMessage = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/message/${selectedChat._id}`,
        config
      );
      console.log("messages", message);
      setMessage(data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchMessage();
  }, [selectedChat]);
  const typingHandler = async (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      console.log("eneter");
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.data?.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          "/api/v1/message/",
          {
            message: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log("data", data);
        setNewMessage([...message, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div>
        {selectedChat ? (
          <>
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
              <div>
                {loading ? (
                  <span>Loading ...</span>
                ) : (
                  <div>{/* Message */}</div>
                )}
              </div>
            </div>
            <div className="mt-[54%]" onKeyDown={sendMessage}>
              <input
                onChange={typingHandler}
                value={newMessage}
                className="w-[100%] p-4 focus:outline-none rounded-xl"
                type="text"
                placeholder="Enter a message ...."
                required
              />
            </div>
          </>
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
