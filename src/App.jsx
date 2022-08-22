import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";
import { auth } from "./firebase/config";
import SignOut from "./components/SignOut";

function App() {
  const [user] = useAuthState(auth);

  console.log(user);

  return (
    <div className="App">
      <header>
        <h1>⚛️💬</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;
