import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";

const Model = () => {
  const { user } = ChatState();
  const [name, setName] = useState();
  const [addUsers, setAddUsers] = useState();
  const [search, setSearch] = useState();

  console.log("name", name);
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

      const { data } = await axios.get(`/api/v1/user?search=${search}`, config);
      console.log("Model data line30", data);
    } catch (error) {
      toast(error);
      console.log("error while searcing inside Model line 31", error);
    }
  };
  return (
    <>
      <div className="p-12 rounded-md absolute ml-[45%] mt-[10%] bg-green-300 border-black">
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
                onChange={(e) => setName(e.target.value)}
              ></input>
            </form>
          </div>
          <div className="mt-6">
            <form>
              <input
                className="w-full p-2 rounded-md"
                type="text"
                placeholder="Add Users"
                onChange={(e) => setAddUsers(e.target.value)}
              ></input>
            </form>
          </div>
          <div>
            <button
              className="mt-6 bg-blue-600 p-2 text-white rounded-xl
             hover:bg-yellow-200 hover:text-black"
              onClick={handleSearch}
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
