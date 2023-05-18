import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ChatLoading from "./ChatLoading";
import "react-toastify/dist/ReactToastify.css";
import UserListItem from "./UserListItem";
// import { getSender, getSenderFull } from "../config/getSender";

const GroupModelUpdate = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  // console.log("user", user);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(false);
  const [groupName, setGroupName] = useState();

  const handleInfo = () => {
    setUserInfo(!userInfo);
  };

  const handleRename = async () => {
    if (!groupName) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/v1/user/rename`,
        {
          chatId: selectedChat._id,
          newName: groupName,
        },
        config
      );

      console.log("data", data);
      console.log(data._id);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    console.log("search", search);
    if (!query) {
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

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1)) {
      console.log("inside the already");
      toast.error("User Already Added in the group", {
        autoClose: 900,
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user?.data?._id) {
      toast.error("Only Admin can add the user", {
        autoClose: 900,
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/v1/user/addUser",
        {
          groupId: selectedChat._id,
          userId: user1,
        },
        config
      );
      console.log("data", data);
      setLoading(false);
      setSelectedChat(data);
      toast.success("User added successfully", {
        autoClose: 900,
      });

      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="cursor-pointer" onClick={handleInfo}>
        <div>
          <i className="fa-solid fa-circle-info"></i>
        </div>
      </div>
      {userInfo && (
        <div
          className="modal bg-blue-400 p-10 rounded-xl"
          style={{
            position: "absolute",
            top: "50%",
            left: "70%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="">
            <div className="flex justify-between bg-gray-200 rounded-xl p-2">
              <h2 className="text-md">{selectedChat.chatName}</h2>
              <span className="ml-8 font-bold text-xs mt-3 text-red-800">
                {selectedChat.users.length}participants
              </span>
            </div>
            <div className="flex mt-10 justify-center">
              {selectedChat.users.map((u) => (
                <div
                  key={u._id}
                  className="p-2 text-xs rounded-xl mr-2 bg-green-400 cursor-pointer hover:bg-yellow-300"
                >
                  {u.name}
                </div>
              ))}
            </div>
            <div className="mt-6 text-xl flex">
              <div className="mt-1">
                <input
                  className="rounded-xl w-[180px] text-md text-center"
                  placeholder="ChatName"
                  type="text"
                  onChange={(e) => setGroupName(e.target.value)}
                ></input>
              </div>
              <span
                className=" text-xs bg-green-400 ml-4 rounded-xl p-2 cursor-pointer hover:bg-yellow-300"
                onClick={handleRename}
              >
                Update
              </span>
            </div>

            <div className="mt-6 text-xl flex">
              <div className="mt-1">
                <input
                  className="rounded-xl w-[180px] text-center"
                  placeholder="Add User"
                  type="text"
                  onChange={(e) => handleSearch(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex flex-col">
              <ChatLoading key={users.id} users={users} />
            </div>
          ) : (
            <div className="flex flex-col text-sm">
              {users?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleChats={() => handleAddUser(user._id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GroupModelUpdate;
