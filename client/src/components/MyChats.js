import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  console.log("inside the MYchat line 9", chats);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.data?.token}`,
        },
      };
      const { data } = await axios.get("/api/v1/user/fetchChats", config);
      // console.log("inside the Mychats line 22", data);
      setChats(data);
    } catch (error) {
      toast("failed");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchData();
  }, []);

  return (
    <div className="bg-green-300 w-[50%] h-[90vh] rounded-lg flex flex-col p-4">
      <div className="flex justify-between">
        <h2 className="text-blue-600 font-bold text-2xl">My Chats</h2>

        <div>
          <button className="bg-blue-600 p-2 text-white rounded-lg hover:bg-blue-900">
            New Group Chat
          </button>
        </div>
      </div>
      <div className="flex flex-col p-3 rounded-xl bg-white text-black mt-8 hover:bg-blue-600 hover:text-white">
        Hello world
      </div>
    </div>
  );
};
export default MyChats;
