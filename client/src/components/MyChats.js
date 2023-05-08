import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  console.log("inside the chat", user);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  console.log("user", user.token);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/fetchChats");
      console.log(data);
      setChats(data);
    } catch (error) {
      toast("failed");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchData();
  }, []);
  return <div>MyChats</div>;
};

export default MyChats;
