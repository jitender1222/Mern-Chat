import SocketIo from "socket.io-client";
import "./App.css";
const socket = SocketIo.connect("http://localhost:4000");

function App() {
  return <div className="App">Hello world</div>;
}

export default App;
