import SocketIo from "socket.io-client";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
import Chat from "./Pages/Chat";
SocketIo.connect("http://localhost:4000");

function App() {
  return (
    <Routes className="App">
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
