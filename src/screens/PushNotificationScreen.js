import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Button } from 'react-native';
import { registerForPushNotificationsAsync } from 'expo-notifications';

const PushNotificationsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check if the user has previously granted permission for push notifications
    registerForPushNotificationsAsync().then((token) => {
      setIsEnabled(token !== null);
    });
  }, []);

  const handleToggleSwitch = async () => {
    if (!isEnabled) {
      // If the switch is toggled on, ask the user for permission to send push notifications
      const { status } = await registerForPushNotificationsAsync();
      if (status === 'granted') {
        setIsEnabled(true);
      }
    } else {
      // If the switch is toggled off, unregister the device from receiving push notifications
      // (this will also clear the stored push token)
      await ExpoNotifications.setDeviceTokenAsync(null);
      setIsEnabled(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Push Notifications</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Receive push notifications:</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={handleToggleSwitch}
          value={isEnabled}
        />
      </View>
      <Button title="Test Notification" onPress={sendTestNotification} disabled={!isEnabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchText: {
    marginRight: 10,
    fontSize: 18,
  },
});

export default PushNotificationsScreen;
