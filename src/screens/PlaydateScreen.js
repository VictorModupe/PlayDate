import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from 'react-native';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { format } from 'date-fns';

const PlaydateScreen = ({ navigation }) => {
  const [playdates, setPlaydates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "playdates"));
        const playdateData = [];
        querySnapshot.forEach((doc) => {
          const playdate = {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            date: format(new Date(doc.data().date), 'MMMM do, yyyy'),
            time: format(new Date(doc.data().date), 'h:mm a'),
            status: doc.data().status
          };
          playdateData.push(playdate);
        });
        setPlaydates(playdateData);
      } catch (error) {
        console.log("Error getting playdates: ", error);
      }
    };
        
    fetchData();
  }, []);

  const goToCreatePlaydate = () => {
    navigation.navigate('CreatePlaydate');
  };

  const handleAcceptPlaydate = async (playdateId) => {
    try {
      const playdateRef = doc(db, 'playdates', playdateId);
      const playdateDoc = await getDoc(playdateRef);
  
      if (playdateDoc.exists()) {
        const { invited, accepted } = playdateDoc.data();
        const userId = '123'; // Replace with the ID of the current user
  
        // Update the 'accepted' field of the playdate with the current user's ID
        await updateDoc(playdateRef, {
          accepted: [...accepted, userId]
        });
  
        // Update the status of the playdate based on the number of users who have accepted the invitation
        if (accepted.length + 1 >= invited.length) {
          await updateDoc(playdateRef, {
            status: 'confirmed'
          });
        }
      }
    } catch (error) {
      console.log('Error accepting playdate: ', error);
    }
  };
    
  const handleRejectPlaydate = async (playdateId) => {
    try {
      const playdateRef = doc(db, "playdates", playdateId);
      await updateDoc(playdateRef, {
        status: 'rejected'
      });
      setPlaydates(prevPlaydates => {
        return prevPlaydates.map(playdate => {
          if (playdate.id === playdateId) {
            return {
              ...playdate,
              status: 'rejected'
            };
          } else {
            return playdate;
          }
        });
      });
    } catch (error) {
      console.log("Error rejecting playdate: ", error);
    }
  };
  
  const renderItem = ({ item }) => {
    console.log(item.status);
    return (
      <View style={styles.playdate}>
        <View style={styles.playdateInfo}>
          <Text style={styles.playdateTitle}>{item.name}</Text>
          <Text style={styles.playdateTitle}>{item.description}</Text>
          <Text style={styles.playdateDetails}>{item.date}, {item.time}</Text>
          {item.status === 'pending' && (
            <View>
              <Button title="Accept" onPress={() => handleAcceptPlaydate(item.id)} />
              <Button title="Reject" onPress={() => handleRejectPlaydate(item.id)} />
            </View>
          )}
          {item.status === 'accepted' && <Text>Accepted</Text>}
          {item.status === 'rejected' && <Text>Rejected</Text>}
        </View>

      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Playdates</Text>
        <TouchableOpacity style={styles.button} onPress={goToCreatePlaydate}>
          <Text style={styles.buttonText}>Create Playdate</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={playdates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
  },
  playdate: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  playdateInfo: {
    flex: 1,
  },
  playdateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  playdateDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  playdateButton: {
    backgroundColor: '#008B8B',
    padding: 10,
    borderRadius: 5,
  },
  playdateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PlaydateScreen;
