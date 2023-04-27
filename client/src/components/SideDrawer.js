import React, { useState, useRef, useEffect } from "react";
import { ChatState } from "../context/ChatProvider";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { user } = ChatState();
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const showProfile = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="flex justify-between mt-2 shadow-xl p-4">
        <div className="flex cursor-pointer">
          <div className="ml-2 text-2xl">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="ml-2 text-lg">
            <p>Search User</p>
          </div>
        </div>
        <div className="text-3xl">
          <h1>ChatLoom</h1>
        </div>
        <div className="mr-2 text-2xl cursor-pointer flex" ref={ref}>
          <div>
            <i className="fa-solid fa-bell mr-6"></i>
          </div>
          <div onClick={showProfile}>
            <i className="fa-solid fa-user"></i>
            {show && (
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
