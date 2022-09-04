import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';
import { onBackgroundMessage } from 'firebase/messaging/sw';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCjwwUfOFR95aTaf_Zch-TlEEyS-pTRYxM',
  authDomain: 'easily-app.firebaseapp.com',
  projectId: 'easily-app',
  storageBucket: 'easily-app.appspot.com',
  messagingSenderId: '650975721235',
  appId: '1:650975721235:web:e225f630702ec4be298ce6',
  measurementId: 'G-E9K3XQDZLT',
});

const messaging = getMessaging(firebaseApp);
onBackgroundMessage(messaging, (payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png',
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
