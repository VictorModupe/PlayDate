import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    console.log('Permission not granted for notifications');
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/pushToken`).set(token);
}
