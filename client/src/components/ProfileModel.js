import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { getSenderFull } from "../config/getSender";

const ProfileModel = () => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  console.log("users info info", user);
  console.log("Model seletced chat", selectedChat);
  console.log("Model seletced ", selectedChat?.users?.email);
  const [userInfo, setUserInfo] = useState(false);
  const handleInfo = () => {
    setUserInfo(!userInfo);
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
          <div className="modal-content">
            <h2 className="text-4xl text-center font-semibold text-yellow-400">
              Profile Info
            </h2>
            <div className="mt-4">
              <h2>
                Email:
                <span>{getSenderFull(user, selectedChat?.users)}</span>
              </h2>
            </div>
            <div className="mt-8 p-1 hover:bg-red-600 w-[100px] rounded-md text-center  bg-yellow-400 hover:text-white">
              <button onClick={handleInfo}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModel;
