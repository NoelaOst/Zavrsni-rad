import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <h1>Welcome to Noela's Chat</h1>
        <p>Upon your entrance you will be assigned a random pokemon name.</p>
        <p>Let's see if you get your favorite!</p>
        <Link to="/Chat" className="enter-chat-btn">
          Enter Chat
        </Link>
      </div>
    </div>
  );
}

export default App;
