import { Platform } from 'react-native';
import { registerForPushNotificationsAsync } from 'expo-notifications';

const ANDROID_NOTIFICATION_CHANNEL_ID = 'playdate-channel';

export const registerForPushNotifications = async () => {
  let token;
  if (Platform.OS === 'android') {
    // Create a channel for Android notifications
    await createAndroidNotificationChannel();
  }
  const { status } = await registerForPushNotificationsAsync();
  if (status !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return null;
  }
  token = (await getToken()).data;
  console.log('Push Token:', token);
  return token;
};

export const sendPushNotification = async (token, title, body) => {
  const message = {
    to: token,
    sound: 'default',
    title: title,
    body: body,
    data: { data: 'goes here' },
  };
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};

const createAndroidNotificationChannel = async () => {
  await ExpoNotifications.setNotificationChannelAsync(ANDROID_NOTIFICATION_CHANNEL_ID, {
    name: 'PlayDate Channel',
    importance: ExpoNotifications.AndroidImportance.HIGH,
    sound: 'default',
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
};
