import React from "react";

const SideDrawer = () => {
  return (
    <>
      <div className="flex justify-between mt-2 shadow-xl p-4">
        <div className="flex cursor-pointer">
          {/* search */}
          <div className="ml-2 text-2xl">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="ml-2 text-lg">
            <p>Search User</p>
          </div>
        </div>
        {/* heading */}
        <div className="text-3xl">
          <h1>ChatLoom</h1>
        </div>
        {/* notification */}
        <div className="mr-2 text-2xl cursor-pointer">
          <i class="fa-solid fa-bell mr-6"></i>
          <i class="fa-solid fa-user"></i>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
