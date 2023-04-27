import React from "react";
// import { Transition } from "@headlessui/react";

function SearchUserComponent() {
  return (
    <>
      <div className="fixed inset-y-0 left-0 flex flex-col w-64 px-4 py-6 bg-gray-100 shadow-lg">
        <input
          type="text"
          placeholder="Search...."
          className="border-2 border-black p-1 rounded-md focus:border-0 focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>
    </>
  );
}

export default SearchUserComponent;
