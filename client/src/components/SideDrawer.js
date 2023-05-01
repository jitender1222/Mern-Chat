import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import SearchUserComponent from "./SearchUser";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showSearchUser, setShowSearchUser] = useState(false);
  const { user } = ChatState();
  const navigate = useNavigate();

  // const ref = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setShowUserProfile(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [ref]);

  //   search User click
  const handleSearchUserClick = () => {
    setShowSearchUser(!showSearchUser);
  };

  const handleCloseSearchUser = () => {
    setShowSearchUser(!showSearchUser);
  };

  //   show profile
  const showProfile = () => {
    setShow(!show);
  };

  //   show user profile
  const UserProfile = () => {
    setShowUserProfile(!showUserProfile);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <>
      <div className="flex justify-between mt-2 shadow-xl p-4">
        {/* search */}
        {showSearchUser && (
          <SearchUserComponent onClose={handleCloseSearchUser} />
        )}
        <div className="flex cursor-pointer" onClick={handleSearchUserClick}>
          <div className="ml-2 text-2xl ">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="ml-2 text-lg">
            <p>Search User</p>
          </div>
        </div>

        {/* heading */}
        <div className="text-3xl text-blue-400 font-bold">
          <h1>ChatLoom</h1>
        </div>
        {/* notification */}
        <div className="mr-2 text-2xl cursor-pointer flex">
          <div>
            <i className="fa-solid fa-bell mr-6"></i>
          </div>

          <div>
            <i className="fa-solid fa-user " onClick={showProfile}></i>
            {show && (
              <div className="absolute top-[10%] right-0 w-[30%] bg-slate-200 p-8 rounded-lg shadow-lg">
                <div className="text-center" onClick={UserProfile}>
                  User Profile
                </div>
                <div className="text-center mt-2" onClick={handleLogOut}>
                  LogOut
                </div>
              </div>
            )}
            {showUserProfile && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 p-8 rounded-lg shadow-lg">
                <p className="font-bold p-2 text-gray-500">
                  <span className="text-black font-bold mr-2">Name:</span>
                  {user?.data?.userExist?.name}
                </p>
                <p className="text-gray-500 p-2">
                  <span className="text-black font-bold mr-2">Email:</span>
                  {user?.data?.userExist?.email}
                </p>
                <p className="text-gray-500 p-2">
                  <span className="text-black font-bold mr-2">Bio:</span>
                  {user?.data?.userExist?.bio}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
