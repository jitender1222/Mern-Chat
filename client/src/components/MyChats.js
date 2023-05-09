import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  console.log("inside the MYchat line 9", user);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.data?.token}`,
        },
      };
      console.log("config");
      console.log(config);
      const { data } = await axios.get("/api/v1/user/fetchChats", config);
      console.log("inside the Mychats line 22", data);
      setChats(data);
    } catch (error) {
      toast("failed");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchData();
  }, []);

  return <div>My chhats</div>;
};
export default MyChats;
