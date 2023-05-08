import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEvent = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let data = await axios.post(
        "/api/v1/user/register",
        {
          name: name,
          email: email,
          password: password,
        },
        config
      );

      const token = data.data.token;

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast({
        title: "Registration Successfull",
        status: "Success",
        duration: 5000,
        position: "bottom",
      });
      console.log("data inside the register", data);

      if (data) {
        alert("User registered successfully");
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/chat");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleEvent}>
      <div className="container mx-auto mt-20">
        <div className="max-w-md mx-auto bg-white p-16 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-12">
            Create an Account
          </h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-2 rounded-md w-full border-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 rounded-md w-full border-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 rounded-md w-full border-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Sign Up
          </button>
          <br />
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
            onClick={() => navigate("/login")}
          >
            If Registered ? Login
          </button>
        </div>
      </div>
    </form>
  );
};
export default Register;
