window.onload = () => {
    "use strict";
    
    const notificationButton = document.getElementById("tombol");
    let swRegistration = null;
    const TokenElem = document.getElementById("token");
    const ErrElem = document.getElementById("err");
  
    const config = {     
      apiKey: "AIzaSyBzmhQpQtA94ZFGINfGoBLFYfAv279miX4",
      authDomain: "ahmadnurfakih-4d633.firebaseapp.com",
      projectId: "ahmadnurfakih-4d633",
      storageBucket: "ahmadnurfakih-4d633.firebasestorage.app",
      messagingSenderId: "107790419368",
      appId: "1:107790419368:web:3807d72f8c413629d0499d",
      measurementId: "G-DXKYW1539T"
    };
  
    firebase.initializeApp(config);
    const messaging = firebase.messaging();
  
    initializeApp();
  
    function initializeApp() {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        console.log("Service Worker and Push is supported");
        initializeUi();
        initializeFCM();
  
        // Register the service worker
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js") // Pastikan path ini benar
          .then(swReg => {
            console.log("Service Worker is registered", swReg);
            swRegistration = swReg;
          })
          .catch(error => {
            console.error("Service Worker Error", error);
          });
      } else {
        console.warn("Push messaging is not supported");
        notificationButton.textContent = "Push Not Supported";
      }
    }
  
    function initializeUi() {
      notificationButton.addEventListener("click", () => {
        displayNotification();
      });
    }
  
    function initializeFCM() {
      messaging
        .requestPermission()
        .then(() => {
          console.log("Notification permission granted.");
  
          // Get the token
          return messaging.getToken();
        })
        .then(token => {
          // Tampilkan token di console dan bukan di halaman
          console.log("Token: ", token);
        })
        .catch(err => {
          ErrElem.innerHTML = "Error: " + err;
          console.log("Unable to get permission to notify.", err);
        });
    }
  
    function displayNotification() {
      if (window.Notification && Notification.permission === "granted") {
        // Cek apakah service worker aktif
        if (swRegistration) {
          const options = {
            body: "Haloo! Selamat Datang",
            icon: "images/Lonceng.png"
          };
          swRegistration.showNotification(" ", options);
        }
      } else if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(status => {
          if (status === "granted") {
            displayNotification();
          } else {
            alert("You denied or dismissed permissions to notifications.");
          }
        });
      } else {
        alert("You denied permissions to notifications. Please go to your browser settings to allow notifications.");
      }
    }
  };