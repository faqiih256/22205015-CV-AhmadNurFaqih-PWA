importScripts('https://www.gstatic.com/firebasejs/9.16.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.16.0/firebase-messaging-compat.js');

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBzmhQpQtA94ZFGINfGoBLFYfAv279miX4",
    authDomain: "ahmadnurfakih-4d633.firebaseapp.com",
    projectId: "ahmadnurfakih-4d633",
    storageBucket: "ahmadnurfakih-4d633.firebasestorage.app",
    messagingSenderId: "107790419368",
    appId: "1:107790419368:web:3807d72f8c413629d0499d",
    measurementId: "G-DXKYW1539T"
  });
}

const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notification = payload.data.notification ? JSON.parse(payload.data.notification) : { title: "New Message", body: "You have a new message." };

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: 'images/Lonceng.png' 
  };


  return self.registration.showNotification(notificationTitle, notificationOptions);
});
