import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import UserListItem from "./UserListItem";
import "react-toastify/dist/ReactToastify.css";
import UserItem from "./UserItem";

const Model = () => {
  const { user, setChats, chats } = ChatState();
  // const [name, setName] = useState();
  const [addUsers, setAddUsers] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);

  console.log("user", user);
  console.log("adduser", addUsers);

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query) {
      console.log("no data");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(`/api/v1/user?search=${search}`, config);
      console.log("Model data line30", data);
      setAddUsers(data);
      setLoading(false);
    } catch (error) {
      toast(error);
      console.log("error while searcing inside Model line 31", error);
    }
  };

  const handleGroup = (userToAdd) => {
    if (searchUser.includes(userToAdd)) {
      // console.log("inside the waring");
      toast("User already Exist");
      return;
    }
    setSearchUser([...searchUser, userToAdd]);
  };

  console.log("search User", searchUser);

  const handleSubmit = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`,
      },
    };
    if (!groupChatName) {
      toast.error("Please put your group name!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (!searchUser) {
      toast.error("Add Users also !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log("chat grp name", groupChatName);
    var users = JSON.stringify(searchUser.map((u) => u._id));
    console.log("users", users);
    try {
      const { data } = await axios.post(
        "/api/v1/user/group",
        {
          name: groupChatName,
          users: JSON.stringify(searchUser.map((u) => u._id)),
        },
        config
      );
      console.log("data for group", data);
      setChats([data, ...chats]);

      toast.success("Group created successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleDelete = (user) => {
    setSearchUser(searchUser.filter((selUser) => selUser._id !== user._id));
  };
  return (
    <>
      <div className="p-12 rounded-md absolute ml-[45%] mt-[4%] bg-green-300 border-black">
        <h2 className="text-4xl text-blue-600 font-semibold">
          Create Chat Group
        </h2>
        <div className="mt-6">
          <div>
            <form>
              <input
                className="w-full p-2 rounded-md border-none"
                type="text"
                placeholder="Chat Name"
                onChange={(e) => setGroupChatName(e.target.value)}
              ></input>
            </form>
          </div>
          <div className="mt-6">
            <form>
              <input
                className="w-full p-2 rounded-md"
                type="text"
                placeholder="Add Users"
                onChange={(e) => handleSearch(e.target.value)}
              ></input>
              {searchUser.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
              {loading ? (
                <div>loading ...</div>
              ) : (
                addUsers
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user.id}
                      user={user}
                      handleChats={() => handleGroup(user)}
                    />
                  ))
              )}
            </form>
            {}
          </div>
          <div>
            <button
              className="mt-6 bg-blue-600 p-2 text-white rounded-xl
             hover:bg-yellow-200 hover:text-black"
              onClick={handleSubmit}
            >
              Create Chat
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
