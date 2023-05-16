import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";
import GroupChatModel from "./GroupChatModel";
import Model from "./Model";
// import { useRef } from "react";
const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [model, SetModel] = useState(false);
  // const modalRef = useRef();
  console.log("inside the MYchat line 9", chats);

  // console.log("inside the MYchat line selected chat", selectedChat);
  // console.log("inside the MYchat line set selected chat", setSelectedChat);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get("/api/v1/user/fetchChats", config);
      // console.log("inside the Mychats line 22", data);
      setChats(data);
    } catch (error) {
      toast("failed error");
    }
  };

  const getSender = (loggedUser, users) => {
    if (!users || users.length === 0) {
      console.log("users is empty");
      return "";
    }
    return users[0]._id === loggedUser._id ? users[0]?.name : users[1]?.name;
  };

  const accessModel = () => {
    SetModel(!model);
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchData();
    console.log("inside user user", user);
  }, []);

  // useEffect(() => {
  //   function handler(event) {
  //     const target = event.target;
  //     if (!modalRef.current?.contains(target) && target !== modalRef.current) {
  //       SetModel(false);
  //     }
  //   }

  //   window.addEventListener("click", handler);
  //   return () => window.removeEventListener("click", handler);
  // }, []);

  return (
    <div className="bg-green-300 w-[460px] h-[90vh] rounded-lg flex flex-col p-4">
      <div className="flex justify-between">
        <h2 className="text-blue-600 font-bold text-2xl">My Chats</h2>

        <div>
          <GroupChatModel>
            <button
              className="bg-blue-600 p-2 font-semibold text-white rounded-lg hover:bg-yellow-200 hover:text-black"
              onClick={accessModel}
              // ref={modalRef}
            >
              New Group Chat
            </button>
          </GroupChatModel>
        </div>
        {model && <Model />}
      </div>
      <div className="flex flex-col p-3 rounded-xl mt-8 bg-blue-600">
        {chats ? (
          <div>
            {chats.map((chat) => (
              <div
                onClick={() => setSelectedChat(chat)}
                className={`cursor-pointer mt-2 p-4 rounded-md hover:bg-yellow-200 ${
                  selectedChat === chat ? "bg-gray-200" : "bg-green-300"
                }`}
                key={chat.id}
              >
                <div>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-300 border-black text-5xl ">Loading ...</div>
        )}
      </div>
    </div>
  );
};
export default MyChats;
