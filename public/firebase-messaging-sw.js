importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
firebase.initializeApp({
  'messagingSenderId': '738533213905'
});


const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/apple-touch-icon.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
