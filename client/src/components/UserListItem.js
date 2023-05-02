import React from "react";
import Avatar from "./Avatar";

const UserListItem = ({ user }) => {
  console.log("users", user);
  return (
    <>
      <div className="flex flex-col mt-6 rounded-lg p-2 cursor-pointer bg-blue-400">
        <div className="flex justify-between rounded-lg hover:bg-green-400 p-2">
          <div className=" rounded-full ">{<Avatar user={user.avatar} />}</div>
          <div className="capitalize text-white font-semibold">
            {user.name}{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListItem;
