import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chat");
    }
  }, [navigate]);
  return (
    <div className="flex justify-center mt-64">
      <button
        onClick={() => navigate("/register")}
        className="px-4 py-2 mt-4 mr-16 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        SignUp
      </button>
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
      >
        Login
      </button>
    </div>
  );
};

export default HomePage;
