import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { sendPushNotification } from '../utils/notifications';

const CreatePlaydateScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  ).toISOString();

  const handleCreatePlaydate = async () => {
    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(db, 'playdates'), {
        name,
        description,
        date: newDate,
        time: newDate,
        invited: [], // Add the new 'invited' field
        accepted: [], // Add the new 'accepted' field
        status: 'pending'
      });
      setIsLoading(false);

      // Send push notification to all users using Expo Notifications
      const message = {
        title: 'New Playdate!',
        body: `A new playdate called ${name} has been created!`,
        data: {
          playdateId: docRef.id,
        },
        sound: 'default',
        priority: 'high',
        channelId: 'playdates',
      };
      await sendPushNotification(message);
      console.log(message);

      navigation.navigate('Home');
      return docRef.id;
    } catch (error) {
      console.log('Error adding playdate: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>
          {date && time && `${date.toLocaleDateString()} (${time.toLocaleTimeString()})`}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>{time.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCreatePlaydate}>
        <Text style={styles.buttonText}>Create Playdate</Text>
      </TouchableOpacity>
      {isLoading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="#008B8B" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#008B8B',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default CreatePlaydateScreen;
