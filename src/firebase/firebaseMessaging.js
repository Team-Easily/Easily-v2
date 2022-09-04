import { getMessaging, getToken } from 'firebase/messaging';
import { app } from './firebase';

const messaging = getMessaging(app);

//When you need to retrieve the current registration token for an app instance, first request notification permissions from the user with Notification.requestPermission(). When called as shown, this returns a token if permission is granted or rejects the promise if denied:

export default function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
  });
}

export const setToken = async (setTokenFound) => {
  let currentToken = '';

  try {
    currentToken = await getToken(messaging, {
      vapidKey:
        'BDQaoj2rVhmHjZWb0ueNbYw4ltAit0OcZheNHGcktgFwvzURG0EkH9pfTsQ2_XlJ2NuXt5fIKZWGPDs4fOUnKcg',
    });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log('An error occurred while retrieving token.', error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
