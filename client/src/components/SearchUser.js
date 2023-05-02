import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";

function SearchUserComponent({ onClose }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleButton = async () => {
    if (!search) {
      toast.error("Please enter something!");
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/user?search=${search}`);
      setUsers(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("failed");
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
        className="fixed inset-y-0 left-0 flex flex-col w-72 px-4 py-6 bg-gray-100 shadow-lg z-40 transform transition-transform"
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
          users?.map((user) => <UserListItem key={user._id} user={user} />)
        )}
      </div>
    </>
  );
}

export default SearchUserComponent;
