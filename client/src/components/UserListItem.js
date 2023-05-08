import React from "react";
import Avatar from "./Avatar";

const UserListItem = ({ user }) => {
  return (
    <>
      <div className="flex flex-col mt-6 rounded-lg p-2 cursor-pointer bg-blue-400">
        <div className="flex rounded-lg hover:bg-green-400 p-2">
          <div className=" rounded-full">{<Avatar user={user.avatar} />}</div>

          <div className="flex flex-col">
            <div className="capitalize text-black font-semibold ml-4">
              {user.name}
            </div>
            <div className="mt-2 text-black font-md">
              <span className=" font-bold">Email:</span>
              {user.email}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListItem;
