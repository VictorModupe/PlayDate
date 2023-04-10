import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from '../firebase/firestore';

const PlayDatesScreen = ({ navigation }) => {
  const [playdates, setPlaydates] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('playdates')
      .onSnapshot(querySnapshot => {
        const newPlaydates = [];
        querySnapshot.forEach(doc => {
          newPlaydates.push({ id: doc.id, ...doc.data() });
        });
        setPlaydates(newPlaydates);
      });
    return () => unsubscribe();
  }, []);

  const acceptPlaydate = (playdateId) => {
    // Implement accept playdate functionality here
  };

  const ignorePlaydate = (playdateId) => {
    // Implement ignore playdate functionality here
  };

  const renderPlaydate = ({ item }) => (
    <TouchableOpacity style={styles.playdate} onPress={() => navigation.navigate('PlaydateDetails', { playdateId: item.id })}>
      <Text style={styles.playdateTitle}>{item.title}</Text>
      <Text style={styles.playdateDate}>{item.date}</Text>
      {item.creatorId !== firebase.auth().currentUser.uid && (
        <View style={styles.playdateActions}>
          <TouchableOpacity style={styles.acceptButton} onPress={() => acceptPlaydate(item.id)}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ignoreButton} onPress={() => ignorePlaydate(item.id)}>
            <Text style={styles.ignoreButtonText}>Ignore</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PlayDates</Text>
      <FlatList
        data={playdates}
        renderItem={renderPlaydate}
        keyExtractor={item => item.id}
        style={styles.playdateList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  playdateList: {
    width: '100%',
  },
  playdate: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  playdateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  playdateDate: {
    fontSize: 16,
    marginVertical: 10,
  },
  playdateActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: '#00bfff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ignoreButton: {
    backgroundColor: '#dc143c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  ignoreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PlayDatesScreen;
