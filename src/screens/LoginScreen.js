import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      // email or password is empty
      return;
    }
    
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Login successful, navigate to the home screen
        navigation.navigate('Home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          // Password is incorrect
          Alert.alert('Login Error', 'Invalid email or password.');
        } else {
          // TODO: Handle other login errors
          Alert.alert('Login Error', errorMessage);
        }
      });
  };

  return (
    <View style={styles.container}>
        {loading ? (
          <Text style={styles.buttonText}>Loading...</Text>
        ) : (
      <Text style={styles.title}>Login</Text>
      )}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    width: '80%',
    marginVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: 'blue',
    marginTop: 32,
    fontSize: 16,
  },
});

export default LoginScreen;
