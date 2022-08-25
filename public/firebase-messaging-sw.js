importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDTKQYRW8uf0lDZ7ITO-LQ2T__bsV5YYTQ",
  authDomain: "my-app-36ceb.firebaseapp.com",
  projectId: "my-app-36ceb",
  storageBucket: "my-app-36ceb.appspot.com",
  messagingSenderId: "313484907255",
  appId: "1:313484907255:web:0f638acf9350556a0079f2",
  measurementId: "G-NM0FR5QMH9",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./vite.svg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
