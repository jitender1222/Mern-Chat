import React from "react";

const UserItem = ({ user, handleFunction }) => {
  //   console.log("userrrrrrrrrrrrrrrrrrrrrrrr", user);
  //   console.log("handle", handleFunction);
  return (
    <>
      <div
        className="w-24 text-center font-serif font-medium bg-blue-400 cursor-pointer p-2 mt-4 rounded-xl hover:bg-yellow-200 flex"
        onClick={handleFunction}
      >
        <div style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {user.name}
        </div>
      </div>
    </>
  );
};

export default UserItem;
