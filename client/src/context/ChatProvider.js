import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setNewUser] = useState("");
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    setNewUser(JSON.parse(userInfo));
  }, [userInfo]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setNewUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
