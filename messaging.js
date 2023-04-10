import { firebase } from '@react-native-firebase/messaging';

firebase.initializeApp({
  // Your Firebase project configuration
});

const messaging = firebase.messaging();

messaging.onMessage((remoteMessage) => {
  console.log('Received a message from the server:', remoteMessage);
});

export { messaging };
