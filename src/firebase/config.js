import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDTKQYRW8uf0lDZ7ITO-LQ2T__bsV5YYTQ",
  authDomain: "my-app-36ceb.firebaseapp.com",
  projectId: "my-app-36ceb",
  storageBucket: "my-app-36ceb.appspot.com",
  messagingSenderId: "313484907255",
  appId: "1:313484907255:web:0f638acf9350556a0079f2",
  measurementId: "G-NM0FR5QMH9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const messaging = getMessaging(firebaseApp);

const { VITE_APP_VAPID_KEY } = import.meta.env;

export const getFCMToken = async (setTokenFound) => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: VITE_APP_VAPID_KEY,
    });
    if (currentToken) {
      console.log(currentToken);
      setTokenFound(true);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      setTokenFound(false);
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);
