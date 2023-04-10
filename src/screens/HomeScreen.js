import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const HomeScreen = ({ navigation }) => {
  const goToCreatePlaydate = () => {
    navigation.navigate('CreatePlaydate');
  };


  const goToViewProducts = () => {
    navigation.navigate('Products');
  };

  const goToCreateProduct = () => {
    navigation.navigate('CreateProduct');
  };

  const goToPlaydates = () => {
    navigation.navigate('Playdates');
  };


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.header}>Welcome to PlayDate!</Text>
        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={28} color="#fff" />
          <Text style={styles.cartCount}></Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToCreatePlaydate}>
          <Text style={styles.buttonText}>Create Playdate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToViewProducts}>
          <Text style={styles.buttonText}>View Products</Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.button} onPress={goToPlaydates}>
          <Text style={styles.buttonText}>Playdates</Text>
        </TouchableOpacity>
      </View>
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
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F15A22',
    padding: 10,
    borderRadius: 5,
  },
  cartCount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#F15A22',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
