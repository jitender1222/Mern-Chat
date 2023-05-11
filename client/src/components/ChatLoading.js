import React from "react";

const ChatLoading = ({ users }) => {
  return (
    <>
      {users.map((index) => (
        <div
          key={index}
          className="bg-gray-400 animate-pulse rounded-md h-4 w-full mt-8"
        ></div>
      ))}
    </>
  );
};

export default ChatLoading;
