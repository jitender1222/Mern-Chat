import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import { ChatState } from "../context/ChatProvider";
// import { useNavigate } from "react-router-dom";

function SearchUserComponent({ onClose }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const { user, setSelectedChat, chats, setChats } = ChatState();

  const handleButton = async () => {
    if (!search) {
      toast.error("Please enter something!", {
        status: "warning",
        duration: 5000,
        isClosable: true,
        pauseOnHover: "false",
      });
    } else {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        };
        const { data } = await axios.get(
          `/api/v1/user?search=${search}`,
          config
        );
        setUsers(data);
        setLoading(false);
        console.log("inside the search user line 58", data);
      } catch (error) {
        console.log(error);
        toast.error("failed");
      }
    }
  };

  const accessChat = async (userId) => {
    console.log("inside searhc user line 16", userId);
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.data?.token}`,
        },
      };
      const data = await axios.post(`/api/v1/user/chats`, { userId }, config);
      console.log("inside searhc user line 26", data);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoading(false);
    } catch (error) {
      toast.error("failed to fetch the data");
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-800 opacity-50 z-40 transition-opacity"
        style={{ transform: "translateX(0%)" }}
        onClick={onClose}
      ></div>

      {/* Search Box */}
      <div
        className="fixed inset-y-0 left-0 flex flex-col w-72 px-4 py-6 bg-gray-100 shadow-lg z-40 
        transform transition-transform overflow-y-auto overflow-x-hidden scroll-smooth	"
        style={{ transform: "translateX(0%)" }}
      >
        <input
          type="text"
          placeholder="Search...."
          className="border-2 border-black p-1 rounded-md focus:border-0 focus:outline-none focus:ring focus:ring-blue-400"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          className="mt-2 p-2 rounded-lg w-20 bg-blue-400 text-white"
          onClick={handleButton}
        >
          Go
        </button>
        <div className="absolute left-[200%]">
          <ToastContainer
            position={"top-left"}
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover="false"
            theme="light"
            toastStyle={{ marginRight: "auto" }}
          />
        </div>
        {loading ? (
          <ChatLoading key={users.id} users={users} />
        ) : (
          users?.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleChats={() => accessChat(user._id)}
            />
          ))
        )}
        {/* {loading && <ChatLoading users={users} />} */}
      </div>
    </>
  );
}

export default SearchUserComponent;
