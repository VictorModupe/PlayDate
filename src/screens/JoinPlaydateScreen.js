import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
// import { firebase } from '@react-native-firebase/messaging';
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';

const JoinPlaydateScreen = ({ navigation }) => {
  const [playdateCode, setPlaydateCode] = useState('');

  // const joinPlaydate = async () => {
  //   try {
  //     const user = auth().currentUser;
  //     const uid = user.uid;

  //     const playdateRef = database().ref(`playdates/${playdateCode}`);
  //     const snapshot = await playdateRef.once('value');

  //     if (snapshot.exists()) {
  //       // Check if user has already joined the playdate
  //       const playdate = snapshot.val();
  //       if (playdate.participants && playdate.participants.includes(uid)) {
  //         Alert.alert('Already joined', 'You have already joined this playdate');
  //         return;
  //       }

  //       // Add user to playdate participants list
  //       const participants = playdate.participants ? [...playdate.participants, uid] : [uid];
  //       await playdateRef.update({ participants });

  //       // Send notification to playdate host
  //       const hostId = playdate.hostId;
  //       const hostTokenRef = database().ref(`users/${hostId}/pushToken`);
  //       const hostTokenSnapshot = await hostTokenRef.once('value');
  //       const hostToken = hostTokenSnapshot.val();
  //       const message = {
  //         notification: {
  //           title: 'New participant joined',
  //           body: `${user.displayName} has joined your playdate!`,
  //         },
  //         token: hostToken,
  //         data: {
  //           screen: 'PlaydateRequestsScreen',
  //           playdateCode: playdateCode,
  //         },
  //       };
  //       await firebase.messaging().send(message);

  //       Alert.alert('Joined successfully', 'You have joined this playdate');
  //       navigation.navigate('Home');
  //     } else {
  //       Alert.alert('Invalid code', 'This playdate code does not exist');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert('Error', 'An error occurred while joining the playdate');
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Playdate</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter playdate code"
        value={playdateCode}
        onChangeText={(text) => setPlaydateCode(text)}
      /> 
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Join Playdate</Text>
      </TouchableOpacity>
    </View>
  );
};
      //onPress={joinPlaydate}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 30,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default JoinPlaydateScreen;
