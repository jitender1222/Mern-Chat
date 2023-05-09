import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";

const MyChats = () => {
  return <>HEllo wlrld</>;
  //   const [loggedUser, setLoggedUser] = useState();
  //   const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  //   console.log("inside the MYchat ", user);

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   };
  //   console.log("user token", user?.data?.token);
  //   console.log("user user", user);

  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get("/api/v1/user/fetchChats");
  //       console.log(data);
  //       setChats(data);
  //     } catch (error) {
  //       toast("failed");
  //     }
  //   };

  //   useEffect(() => {
  //     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  //     fetchData();
  //   }, []);
  //   return <div>MyChats</div>;
  // };
};
export default MyChats;
