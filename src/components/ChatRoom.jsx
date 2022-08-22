import React, { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import ChatMessage from "./ChatMessage";
import { auth, db } from "../firebase/config";

const ChatRoom = () => {
  const dummy = useRef();

  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(25)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), uid: doc.id });
      });
      setMessages(messages);
      return () => unsubscribe();
    });
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    try {
      const messageRef = await addDoc(collection(db, "messages"), {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });

      console.log("Message written with ID: ", messageRef.id);
    } catch (err) {
      console.error("Error while adding document: ", err);
    }

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(messages);

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
};

export default ChatRoom;
