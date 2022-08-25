import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";
import { auth, getFCMToken, onMessageListener } from "./firebase/config";
import SignOut from "./components/SignOut";
import { getMessaging, onMessage } from "firebase/messaging";

function App() {
  const [user] = useAuthState(auth);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    getFCMToken(setTokenFound);
  }, [setTokenFound]);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .catch((err) => console.log("failed", err));

  console.log(notification);
  console.log(show);

  const Display = () => (
    <div>
      <h4>{notification.title}</h4>
      <h5>{notification.body}</h5>
    </div>
  );

  toast.info(<Display />, {
    toastId: "customId",
  });

  return (
    <div className="App">
      {show && <ToastContainer />}
      <header>
        <h1>⚛️💬</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;
