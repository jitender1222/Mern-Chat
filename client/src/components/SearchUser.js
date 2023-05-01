function SearchUserComponent({ onClose, showSearchUser }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-800 opacity-50 z-40 transition-opacity"
        style={{ transform: "translateX(0%)" }}
        onClick={onClose}
      ></div>

      {/* Search Box */}
      <div
        className="fixed inset-y-0 left-0 flex flex-col w-64 px-4 py-6 bg-gray-100 shadow-lg z-40 transform transition-transform"
        style={{ transform: "translateX(0%)" }}
      >
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
