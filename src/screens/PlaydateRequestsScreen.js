import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { firebase } from '../../firebase';

const PlaydateRequestScreen = ({ route, navigation }) => {
  const { playdateId } = route.params;
  const [requestMessage, setRequestMessage] = useState('');

  const handleSendRequest = () => {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection('playdates').doc(playdateId).collection('requests').add({
      sender: currentUser.uid,
      message: requestMessage,
      status: 'pending',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Request sent successfully!');
      navigation.goBack();
    })
    .catch((error) => {
      Alert.alert('Error sending request', error.message);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Request</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter request message"
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setRequestMessage(text)}
        value={requestMessage}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendRequest}>
        <Text style={styles.buttonText}>Send Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '80%',
    height: 100
  },
  button: {
    backgroundColor: '#1a73e8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default PlaydateRequestScreen;
