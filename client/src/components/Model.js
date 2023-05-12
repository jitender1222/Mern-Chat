import React from "react";

const Model = () => {
  return (
    <>
      <div className="p-12 rounded-md absolute ml-[45%] mt-[10%] bg-red-200 border-black">
        <h2 className="text-4xl">Create Chat Group</h2>
        <div className="mt-8">
          <div>
            <input
              className="w-full p-2 rounded-md border-none"
              type="text"
              placeholder="Chat Name"
            ></input>
          </div>
          <div className="mt-8">
            <input
              className="w-full p-2 rounded-md"
              type="text"
              placeholder="Add Users"
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
