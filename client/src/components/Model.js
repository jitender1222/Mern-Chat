import React from "react";

const Model = () => {
  return (
    <>
      <div className="p-8 rounded-md absolute ml-[50%] mt-[10%] bg-red-200 border-black">
        <h2 className="text-4xl">Create Chat Group</h2>
        <div className="mt-2">
          <div>
            <input type="text" placeholder="Chat Name"></input>
          </div>
          <div className="mt-2">
            <input type="text" placeholder="Add Users"></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
