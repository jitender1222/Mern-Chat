import React from "react";

const ChatLoading = ({ users }) => {
  return (
    <>
      {users.map((key) => (
        <div
          key={key}
          className="bg-gray-200 animate-pulse rounded-md h-4 w-full mt-4"
        ></div>
      ))}
    </>
  );
};

export default ChatLoading;
