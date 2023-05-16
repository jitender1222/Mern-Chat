import React from "react";

const UserItem = ({ user, handleFunction }) => {
  //   console.log("userrrrrrrrrrrrrrrrrrrrrrrr", user);
  //   console.log("handle", handleFunction);
  return (
    <>
      <div
        className="w-24 font-serif font-medium bg-blue-400 cursor-pointer p-2 mt-4 rounded-xl hover:bg-yellow-200 flex justify-around"
        onClick={handleFunction}
      >
        <div className="capitalize">
          {user.name}
          <span className="ml-2">❌</span>
        </div>
      </div>
    </>
  );
};

export default UserItem;
