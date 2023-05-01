import React from "react";

const UserListItem = ({ user }) => {
  console.log("users", user);
  return (
    <>
      <div className="flex flex-col bg-slate-300 mt-2 rounded-lg p-4 cursor-pointer hover:bg-blue-400">
        Hello
      </div>
    </>
  );
};

export default UserListItem;
